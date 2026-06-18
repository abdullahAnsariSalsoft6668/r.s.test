import { supabase } from '@/supabase';
import type { DonationEntry } from '@/models/finance.types';

import { getCurrentUserId } from './getCurrentUserId';

type DbDonation = {
  id: string;
  amount: number;
  recipient_id: string;
  type: DonationEntry['type'];
  date: string;
  note: string | null;
  currency: string | null;
};

const mapDonation = (row: DbDonation): DonationEntry => ({
  id: row.id,
  amount: Number(row.amount),
  recipientId: row.recipient_id,
  type: row.type,
  date: row.date,
  note: row.note ?? undefined,
  currency: (row.currency as DonationEntry['currency']) ?? undefined,
});

export async function fetchDonations(): Promise<DonationEntry[]> {
  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    throw error;
  }

  return (data as DbDonation[]).map(mapDonation);
}

export async function createDonation(payload: Omit<DonationEntry, 'id'>): Promise<DonationEntry> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('donations')
    .insert({
      user_id: userId,
      amount: payload.amount,
      recipient_id: payload.recipientId,
      type: payload.type,
      date: payload.date,
      note: payload.note ?? null,
      currency: payload.currency ?? 'PKR',
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapDonation(data as DbDonation);
}

export async function updateDonation(
  id: string,
  patch: Partial<Omit<DonationEntry, 'id'>>,
): Promise<DonationEntry> {
  const dbPatch: Record<string, unknown> = {};

  if (patch.amount !== undefined) {
    dbPatch.amount = patch.amount;
  }
  if (patch.recipientId !== undefined) {
    dbPatch.recipient_id = patch.recipientId;
  }
  if (patch.type !== undefined) {
    dbPatch.type = patch.type;
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

  const { data, error } = await supabase
    .from('donations')
    .update(dbPatch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapDonation(data as DbDonation);
}

export async function deleteDonation(id: string): Promise<{ success: true }> {
  const { error } = await supabase.from('donations').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return { success: true };
}
