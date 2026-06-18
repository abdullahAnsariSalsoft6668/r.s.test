import { supabase } from '@/supabase';
import type { IncomeEntry } from '@/models/finance.types';

import { getCurrentUserId } from './getCurrentUserId';

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

  if (error) {
    throw error;
  }

  return (data as DbIncome[]).map(mapIncome);
}

export async function createIncome(payload: Omit<IncomeEntry, 'id'>): Promise<IncomeEntry> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('incomes')
    .insert({
      user_id: userId,
      amount: payload.amount,
      category_id: payload.categoryId,
      date: payload.date,
      note: payload.note ?? null,
      recurring: payload.recurring,
      currency: payload.currency ?? 'PKR',
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapIncome(data as DbIncome);
}

export async function updateIncome(
  id: string,
  patch: Partial<Omit<IncomeEntry, 'id'>>,
): Promise<IncomeEntry> {
  const dbPatch: Record<string, unknown> = {};

  if (patch.amount !== undefined) {
    dbPatch.amount = patch.amount;
  }
  if (patch.categoryId !== undefined) {
    dbPatch.category_id = patch.categoryId;
  }
  if (patch.date !== undefined) {
    dbPatch.date = patch.date;
  }
  if (patch.note !== undefined) {
    dbPatch.note = patch.note ?? null;
  }
  if (patch.recurring !== undefined) {
    dbPatch.recurring = patch.recurring;
  }
  if (patch.currency !== undefined) {
    dbPatch.currency = patch.currency;
  }

  const { data, error } = await supabase
    .from('incomes')
    .update(dbPatch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapIncome(data as DbIncome);
}

export async function deleteIncome(id: string): Promise<{ id: string }> {
  const { error } = await supabase.from('incomes').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return { id };
}
