# Supabase Backend Guide for RizqShare

This document explains how to connect this React Native app to **Supabase** so finance data (income, expenses, donations, recipients) persists per user instead of the in-memory mock.

---

## 1. What the app does today

| Layer | Location | Behavior |
|-------|----------|----------|
| Finance API | `src/api/*ApiSlice.ts` | RTK Query endpoints using `queryFn` |
| Mock data | `src/api/mock/mockStore.ts` | All finance reads/writes stay in memory |
| Auth | `src/redux/actions/auth.ts` | Demo login with static tokens |
| Types | `src/models/finance.types.ts` | Shapes Supabase tables should match |
| Dashboard / analytics | `src/utils/donationCalculations.ts` | Computed on client from raw rows |

**Important:** Legacy grocery APIs (`src/api/authApiSlice.js`, cart, checkout, etc.) talk to a different REST server. This guide covers **Rizq finance features only**.

Screens that need Supabase:

- Home, Transactions, Donate, Analytics (read)
- Add Income, Add Expense, Add Donation (write)
- Recipients List, Add Recipient, Giving Settings (write)

---

## 2. Goal architecture

```text
React Native screens
        ↓  (same hooks: useGetIncomesQuery, etc.)
RTK Query slices  (src/api/*ApiSlice.ts)
        ↓
Supabase service layer  (src/api/supabase/*)
        ↓
@supabase/supabase-js client  (src/lib/supabase.ts)
        ↓
Supabase Postgres + Auth + Storage
```

You keep existing UI hooks unchanged. Only the `queryFn` implementations switch from `mockStore` to Supabase calls.

---

## 3. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and create a project.
2. Wait for the database to finish provisioning.
3. Open **Project Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public key** → `SUPABASE_ANON_KEY`
4. Open **Authentication → Providers** and enable **Email** (password sign-in).
5. Optional: disable email confirmation during development (**Authentication → Providers → Email → Confirm email** off).

---

## 4. Run the database schema

In Supabase, open **SQL Editor → New query**, paste the script below, and run it.

This creates tables that map directly to `src/models/finance.types.ts`.

```sql
-- Extensions
create extension if not exists "pgcrypto";

-- Profile (one row per auth user)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  preferred_currency text not null default 'PKR' check (preferred_currency in ('PKR', 'USD', 'INR')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Giving settings
create table public.giving_settings (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  donation_percent numeric not null default 10 check (donation_percent >= 0 and donation_percent <= 100),
  calculation_basis text not null default 'all_income'
);

-- Categories
create table public.income_categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.expense_categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

-- Finance entries
create table public.incomes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric not null check (amount >= 0),
  category_id uuid not null references public.income_categories(id),
  date date not null,
  note text,
  recurring boolean not null default false,
  currency text not null default 'PKR' check (currency in ('PKR', 'USD', 'INR')),
  created_at timestamptz not null default now()
);

create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric not null check (amount >= 0),
  category_id uuid not null references public.expense_categories(id),
  date date not null,
  note text,
  receipt_url text,
  currency text not null default 'PKR' check (currency in ('PKR', 'USD', 'INR')),
  created_at timestamptz not null default now()
);

create table public.recipients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  relationship_type text not null check (
    relationship_type in ('Relative', 'Friend', 'Charity', 'Neighbour', 'Other')
  ),
  phone text,
  note text,
  created_at timestamptz not null default now()
);

create table public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric not null check (amount >= 0),
  recipient_id uuid not null references public.recipients(id) on delete restrict,
  type text not null check (
    type in ('Relative', 'Friend', 'Charity', 'Neighbour', 'Other')
  ),
  date date not null,
  note text,
  currency text not null default 'PKR' check (currency in ('PKR', 'USD', 'INR')),
  created_at timestamptz not null default now()
);

-- Seed default categories for every new user
create or replace function public.seed_default_categories()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.giving_settings (user_id) values (new.id);

  insert into public.income_categories (user_id, name, is_default) values
    (new.id, 'Salary', true),
    (new.id, 'Freelance', true),
    (new.id, 'Business', true),
    (new.id, 'Other', true);

  insert into public.expense_categories (user_id, name, is_default) values
    (new.id, 'Groceries', true),
    (new.id, 'Rent', true),
    (new.id, 'Utilities', true),
    (new.id, 'Transport', true),
    (new.id, 'Other', true);

  return new;
end;
$$;

create trigger on_profile_created_seed
  after insert on public.profiles
  for each row execute function public.seed_default_categories();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.giving_settings enable row level security;
alter table public.income_categories enable row level security;
alter table public.expense_categories enable row level security;
alter table public.incomes enable row level security;
alter table public.expenses enable row level security;
alter table public.recipients enable row level security;
alter table public.donations enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create policy "giving_settings_own" on public.giving_settings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "income_categories_own" on public.income_categories
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "expense_categories_own" on public.expense_categories
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "incomes_own" on public.incomes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "expenses_own" on public.expenses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "recipients_own" on public.recipients
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "donations_own" on public.donations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

### Receipt storage bucket

1. **Storage → New bucket** → name: `receipts`, **Private**.
2. Add policy (SQL Editor):

```sql
create policy "receipts_read_own"
on storage.objects for select
using (
  bucket_id = 'receipts'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "receipts_write_own"
on storage.objects for insert
with check (
  bucket_id = 'receipts'
  and auth.uid()::text = (storage.foldername(name))[1]
);
```

Upload path format: `{userId}/{expenseId}/{filename}`.

---

## 5. Install the Supabase client

From project root:

```bash
yarn add @supabase/supabase-js
```

Optional (recommended later for env vars):

```bash
yarn add react-native-config
```

For the first working version, a plain config file is enough.

---

## 6. Add app config

Create `src/config/supabase.ts`:

```typescript
export const SUPABASE_URL = 'https://YOUR_PROJECT_REF.supabase.co';
export const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

// Flip to false once Supabase is wired and you want real network calls.
export const USE_MOCK_FINANCE_API = true;
```

Replace placeholders with values from the Supabase dashboard.

**Security note:** The anon key is safe in the mobile app when RLS is enabled. Never put the **service role** key in the app.

---

## 7. Create the Supabase client

Create `src/lib/supabase.ts`:

```typescript
import 'react-native-url-polyfill/auto'; // add: yarn add react-native-url-polyfill
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/config/supabase';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false, // we already persist via rn-secure-storage + Redux
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
```

Install the polyfill:

```bash
yarn add react-native-url-polyfill
```

Import it once at the top of `App.tsx`:

```typescript
import 'react-native-url-polyfill/auto';
```

---

## 8. Wire authentication

### 8.1 Sign up / sign in

Create `src/api/supabase/authService.ts`:

```typescript
import { supabase } from '@/lib/supabase';
import { loginSessionAction } from '@/redux/actions/auth';

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (!data.session) throw new Error('No session returned');

  await loginSessionAction({
    user: {
      email: data.user.email,
      fullName: data.user.user_metadata?.full_name ?? 'User',
      id: data.user.id,
    },
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    setFirstTime: false,
  });

  return data;
}

export async function signUpWithEmail(fullName: string, email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) throw error;
  return data;
}

export async function signOutFromSupabase() {
  await supabase.auth.signOut();
}
```

### 8.2 Update Login screen

In `src/screens/auth/Login/Login.tsx`, replace the static demo login with:

```typescript
import { signInWithEmail } from '@/api/supabase/authService';

// inside onSubmit:
await signInWithEmail(values.email, values.password);
```

### 8.3 Restore session on app launch

In `src/utils/checkStorage.ts`, after `hydrateAuthFromSecureStorage()`:

```typescript
import { supabase } from '@/lib/supabase';

const refreshToken = await secureStorage.getItem('REFRESH_TOKEN');
if (refreshToken) {
  await supabase.auth.setSession({
    access_token: (await secureStorage.getItem('AUTH_TOKEN')) ?? '',
    refresh_token: refreshToken,
  });
}
```

### 8.4 Re-enable auth gate

In `src/navigation/Routes.tsx`, change:

```typescript
{true ? (
```

to:

```typescript
{isAuthenticated ? (
```

So unauthenticated users see `AuthStack`.

### 8.5 Logout

In `clearDataAction` (`src/redux/actions/auth.ts`), call `signOutFromSupabase()` before clearing storage.

---

## 9. Supabase service layer (finance)

Create folder `src/api/supabase/` with one file per entity. Example for incomes:

`src/api/supabase/incomeService.ts`:

```typescript
import { supabase } from '@/lib/supabase';
import type { IncomeCategory, IncomeEntry } from '@/models/finance.types';

type DbIncome = {
  id: string;
  amount: number;
  category_id: string;
  date: string;
  note: string | null;
  recurring: boolean;
  currency: string | null;
};

const mapIncome = (row: DbIncome): IncomeEntry => ({
  id: row.id,
  amount: Number(row.amount),
  categoryId: row.category_id,
  date: row.date,
  note: row.note ?? undefined,
  recurring: row.recurring,
  currency: (row.currency as IncomeEntry['currency']) ?? undefined,
});

export async function fetchIncomes(): Promise<IncomeEntry[]> {
  const { data, error } = await supabase
    .from('incomes')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return (data as DbIncome[]).map(mapIncome);
}

export async function createIncome(payload: Omit<IncomeEntry, 'id'>): Promise<IncomeEntry> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('incomes')
    .insert({
      user_id: userData.user.id,
      amount: payload.amount,
      category_id: payload.categoryId,
      date: payload.date,
      note: payload.note ?? null,
      recurring: payload.recurring,
      currency: payload.currency ?? 'PKR',
    })
    .select('*')
    .single();

  if (error) throw error;
  return mapIncome(data as DbIncome);
}
```

Repeat the same pattern for:

| Service file | Table(s) |
|--------------|----------|
| `expenseService.ts` | `expenses`, `expense_categories` |
| `donationService.ts` | `donations` |
| `recipientService.ts` | `recipients` |
| `settingsService.ts` | `giving_settings`, `profiles` |

---

## 10. Swap RTK slices from mock → Supabase

Use a feature flag so you can switch back to mock while testing.

Example change in `src/api/incomeApiSlice.ts`:

```typescript
import { USE_MOCK_FINANCE_API } from '@/config/supabase';
import * as incomeService from '@/api/supabase/incomeService';
import { incomeHandlers } from './mock/incomeHandlers';

getIncomes: builder.query<IncomeEntry[], void>({
  queryFn: async () => {
    try {
      const data = USE_MOCK_FINANCE_API
        ? await incomeHandlers.getIncomes()
        : await incomeService.fetchIncomes();
      return { data };
    } catch (error) {
      return {
        error: {
          status: 'CUSTOM_ERROR',
          error: error instanceof Error ? error.message : 'Failed to load incomes',
        },
      };
    }
  },
  // ...tags unchanged
}),
```

### Recommended migration order

1. **Auth** — sign up, login, logout, session restore
2. **Income + categories** — `incomeApiSlice.ts`
3. **Expense + categories + receipts** — `expenseApiSlice.ts` + Storage
4. **Recipients** — `recipientApiSlice.ts`
5. **Donations** — `donationApiSlice.ts`
6. **Giving settings** — `settingsApiSlice.ts`
7. **Dashboard + transactions + analytics** — keep client-side compute initially

For step 7, fetch rows from Supabase in `dashboardApiSlice` / `analyticsApiSlice`, then pass them into existing helpers in `src/utils/donationCalculations.ts` instead of `mockStore`.

Set `USE_MOCK_FINANCE_API = false` when steps 1–6 work.

---

## 11. Column name mapping cheat sheet

| App field (`finance.types.ts`) | Supabase column |
|-------------------------------|-----------------|
| `categoryId` | `category_id` |
| `recipientId` | `recipient_id` |
| `relationshipType` | `relationship_type` |
| `receiptUri` | `receipt_url` (public/signed URL from Storage) |
| `donationPercent` | `donation_percent` |
| `calculationBasis` | `calculation_basis` |
| `userId` | `user_id` |
| `isDefault` | `is_default` |

Always convert `snake_case` DB rows to `camelCase` before returning to the app.

---

## 12. Receipt upload example

```typescript
import { supabase } from '@/lib/supabase';

export async function uploadReceipt(userId: string, expenseId: string, localUri: string) {
  const fileName = `${Date.now()}.jpg`;
  const path = `${userId}/${expenseId}/${fileName}`;

  const response = await fetch(localUri);
  const blob = await response.blob();

  const { error: uploadError } = await supabase.storage
    .from('receipts')
    .upload(path, blob, { contentType: 'image/jpeg', upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('receipts').getPublicUrl(path);
  // For private buckets, use createSignedUrl instead of getPublicUrl.
  return data.publicUrl;
}
```

Then save `receipt_url` on the expense row.

---

## 13. Local dev checklist

- [ ] Supabase project created
- [ ] SQL schema + RLS applied
- [ ] `receipts` bucket created
- [ ] `@supabase/supabase-js` installed
- [ ] `src/config/supabase.ts` filled in
- [ ] `src/lib/supabase.ts` created
- [ ] Login uses `signInWithEmail`
- [ ] `Routes.tsx` uses `isAuthenticated`
- [ ] At least one slice (income) reads/writes Supabase
- [ ] `USE_MOCK_FINANCE_API = false` for that slice
- [ ] Test: add income → kill app → reopen → data still there

---

## 14. Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| `new row violates row-level security` | User not authenticated or wrong `user_id` | Ensure `supabase.auth.getUser()` returns a user before insert |
| Empty lists after login | RLS OK but no seed trigger ran | Check `profiles` row exists; re-run signup or insert `giving_settings` manually |
| Auth works but queries fail | Session not set on client | Call `supabase.auth.setSession()` on boot with stored tokens |
| Receipt upload fails | Storage policy or wrong path | Path must start with `{auth.uid()}/...` |
| Still seeing demo data | Mock flag still on | Set `USE_MOCK_FINANCE_API = false` |
| App always shows main stack | Auth bypass | Fix `{true ?` in `Routes.tsx` |

---

## 15. What you do NOT need Supabase for (yet)

These can stay on device for now:

- **Theme** (`THEME` in secure storage)
- **Language** (`LANGUAGE` in secure storage)
- **Onboarding flag** (`IS_FIRST_TIME`)
- **Dashboard math** — compute on client from Supabase rows
- **Legacy grocery screens** — separate REST backend

---

## 16. File reference map

| Purpose | Path |
|---------|------|
| Finance types | `src/models/finance.types.ts` |
| RTK base API | `src/api/baseApi.ts` |
| Mock store (replace) | `src/api/mock/mockStore.ts` |
| Income endpoints | `src/api/incomeApiSlice.ts` |
| Expense endpoints | `src/api/expenseApiSlice.ts` |
| Donation endpoints | `src/api/donationApiSlice.ts` |
| Recipient endpoints | `src/api/recipientApiSlice.ts` |
| Settings endpoints | `src/api/settingsApiSlice.ts` |
| Dashboard endpoints | `src/api/dashboardApiSlice.ts` |
| Analytics endpoints | `src/api/analyticsApiSlice.ts` |
| Dashboard calculations | `src/utils/donationCalculations.ts` |
| Auth actions | `src/redux/actions/auth.ts` |
| App boot hydration | `src/utils/checkStorage.ts` |
| Auth navigation gate | `src/navigation/Routes.tsx` |
| Login screen | `src/screens/auth/Login/Login.tsx` |

---

## 17. Minimal “working app” path (fastest)

If you only want something working end-to-end quickly:

1. Run the SQL schema (Section 4).
2. Install Supabase client (Section 5–7).
3. Wire login + auth gate (Section 8).
4. Implement **only** `incomeService.ts` and switch **only** `incomeApiSlice.ts`.
5. Turn off mock for income: `USE_MOCK_FINANCE_API = false` inside that slice only.
6. Confirm add/edit/delete income persists across app restarts.
7. Copy the same pattern for expenses → donations → recipients.

That gives you a real backend for daily use while analytics/dashboard can still use mock or client-side compute temporarily.

---

## 18. Next steps after basics work

- Move `preferred_currency` from local storage to `profiles.preferred_currency`
- Add Supabase **Edge Functions** for AI insight text in analytics
- Add SQL **RPC** `get_dashboard_summary(user_id)` if you want server-side aggregation
- Enable email confirmation + password reset flows in Supabase Auth
- Add offline queue (optional) with Redux persist or WatermelonDB

---

**Questions while implementing?** Start with Section 17 (minimal path). Most issues are auth session + RLS — fix those first before migrating every slice.
