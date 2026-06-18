import { supabase } from '@/supabase';
import type { ExpenseEntry } from '@/models/finance.types';

import { getCurrentUserId } from './getCurrentUserId';

const RECEIPTS_BUCKET = 'receipts';
const SIGNED_URL_TTL_SECONDS = 3600;

type DbExpense = {
  id: string;
  amount: number;
  category_id: string;
  date: string;
  note: string | null;
  receipt_url: string | null;
  currency: string | null;
};

const isLocalUri = (uri: string): boolean =>
  uri.startsWith('file://') || uri.startsWith('content://');

async function getSignedReceiptUrl(storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(RECEIPTS_BUCKET)
    .createSignedUrl(storagePath, SIGNED_URL_TTL_SECONDS);

  if (error) {
    throw error;
  }

  return data.signedUrl;
}

async function uploadReceiptFile(localUri: string, expenseId: string): Promise<string> {
  const userId = await getCurrentUserId();
  const fileName = `${Date.now()}.jpg`;
  const path = `${userId}/${expenseId}/${fileName}`;

  const response = await fetch(localUri);
  const blob = await response.blob();

  const { error } = await supabase.storage.from(RECEIPTS_BUCKET).upload(path, blob, {
    contentType: 'image/jpeg',
    upsert: true,
  });

  if (error) {
    throw error;
  }

  return path;
}

async function resolveReceiptUri(receiptUrl: string | null): Promise<string | undefined> {
  if (!receiptUrl) {
    return undefined;
  }

  if (receiptUrl.startsWith('http://') || receiptUrl.startsWith('https://')) {
    return receiptUrl;
  }

  try {
    return await getSignedReceiptUrl(receiptUrl);
  } catch {
    return undefined;
  }
}

const mapExpense = async (row: DbExpense): Promise<ExpenseEntry> => ({
  id: row.id,
  amount: Number(row.amount),
  categoryId: row.category_id,
  date: row.date,
  note: row.note ?? undefined,
  receiptUri: await resolveReceiptUri(row.receipt_url),
  currency: (row.currency as ExpenseEntry['currency']) ?? undefined,
});

async function persistReceiptIfNeeded(
  expenseId: string,
  receiptUri?: string,
): Promise<string | null> {
  if (!receiptUri?.trim()) {
    return null;
  }

  if (isLocalUri(receiptUri)) {
    return uploadReceiptFile(receiptUri, expenseId);
  }

  if (receiptUri.startsWith('http://') || receiptUri.startsWith('https://')) {
    return null;
  }

  return receiptUri;
}

export async function fetchExpenses(): Promise<ExpenseEntry[]> {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    throw error;
  }

  return Promise.all((data as DbExpense[]).map(mapExpense));
}

export async function createExpense(payload: Omit<ExpenseEntry, 'id'>): Promise<ExpenseEntry> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('expenses')
    .insert({
      user_id: userId,
      amount: payload.amount,
      category_id: payload.categoryId,
      date: payload.date,
      note: payload.note ?? null,
      currency: payload.currency ?? 'PKR',
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  const receiptPath = await persistReceiptIfNeeded(data.id, payload.receiptUri);

  if (!receiptPath) {
    return mapExpense(data as DbExpense);
  }

  const { data: updated, error: updateError } = await supabase
    .from('expenses')
    .update({ receipt_url: receiptPath })
    .eq('id', data.id)
    .select('*')
    .single();

  if (updateError) {
    throw updateError;
  }

  return mapExpense(updated as DbExpense);
}

export async function updateExpense(
  id: string,
  patch: Partial<Omit<ExpenseEntry, 'id'>>,
): Promise<ExpenseEntry> {
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
  if (patch.currency !== undefined) {
    dbPatch.currency = patch.currency;
  }

  if (patch.receiptUri !== undefined) {
    if (!patch.receiptUri) {
      dbPatch.receipt_url = null;
    } else {
      dbPatch.receipt_url = await persistReceiptIfNeeded(id, patch.receiptUri);
    }
  }

  const { data, error } = await supabase
    .from('expenses')
    .update(dbPatch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapExpense(data as DbExpense);
}

export async function deleteExpense(id: string): Promise<{ id: string }> {
  const { error } = await supabase.from('expenses').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return { id };
}

/** Keeps local URI for form preview; upload happens on create/update. */
export async function uploadReceipt(localUri: string): Promise<{ receiptUri: string }> {
  if (!localUri?.trim()) {
    throw new Error('Receipt URI is required');
  }

  return { receiptUri: localUri };
}
