import { supabase } from '@/supabase';
import type { ExpenseCategory, IncomeCategory } from '@/models/finance.types';

import { getCurrentUserId } from './getCurrentUserId';

type DbIncomeCategory = {
  id: string;
  name: string;
  is_default: boolean;
};

type DbExpenseCategory = {
  id: string;
  name: string;
  is_default: boolean;
};

const mapIncomeCategory = (row: DbIncomeCategory): IncomeCategory => ({
  id: row.id,
  name: row.name,
  isDefault: row.is_default,
});

const mapExpenseCategory = (row: DbExpenseCategory): ExpenseCategory => ({
  id: row.id,
  name: row.name,
  isDefault: row.is_default,
});

export async function fetchIncomeCategories(): Promise<IncomeCategory[]> {
  const { data, error } = await supabase
    .from('income_categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return (data as DbIncomeCategory[]).map(mapIncomeCategory);
}

export async function createIncomeCategory(name: string): Promise<IncomeCategory> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('income_categories')
    .insert({ user_id: userId, name, is_default: false })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapIncomeCategory(data as DbIncomeCategory);
}

export async function fetchExpenseCategories(): Promise<ExpenseCategory[]> {
  const { data, error } = await supabase
    .from('expense_categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return (data as DbExpenseCategory[]).map(mapExpenseCategory);
}

export async function createExpenseCategory(name: string): Promise<ExpenseCategory> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('expense_categories')
    .insert({ user_id: userId, name, is_default: false })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapExpenseCategory(data as DbExpenseCategory);
}
