import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const FINANCE_API_BASE_URL = 'http://localhost:5000/api';

export const FINANCE_TAG_TYPES = [
  'Income',
  'Expense',
  'Donation',
  'Recipient',
  'Settings',
  'Dashboard',
] as const;

export type FinanceTagType = (typeof FINANCE_TAG_TYPES)[number];

/** Tags used by `getTransactions` — invalidate these after finance writes. */
export const TRANSACTION_LIST_TAGS = ['Income', 'Expense', 'Donation'] as const satisfies readonly FinanceTagType[];

export const invalidateAfterIncomeWrite = ['Income', 'Dashboard'] as const satisfies readonly FinanceTagType[];
export const invalidateAfterExpenseWrite = ['Expense', 'Dashboard'] as const satisfies readonly FinanceTagType[];
export const invalidateAfterDonationWrite = ['Donation', 'Dashboard'] as const satisfies readonly FinanceTagType[];

/** Simulates network latency for mock responses. */
export const mockDelay = (ms = 300): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const rawBaseQuery = fetchBaseQuery({
  baseUrl: FINANCE_API_BASE_URL,
});

/**
 * Finance API base query. Alpha uses localhost; individual slices can intercept
 * failed requests and serve data from `src/api/mock/` until the backend is ready.
 */
export const financeBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  return result;
};

export const baseApi = createApi({
  reducerPath: 'financeApi',
  baseQuery: financeBaseQuery,
  tagTypes: [...FINANCE_TAG_TYPES],
  endpoints: () => ({}),
});
