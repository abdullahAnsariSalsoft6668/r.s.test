import { supabase } from '@/supabase';
import type { Recipient } from '@/models/finance.types';

import { getCurrentUserId } from './getCurrentUserId';

type DbRecipient = {
  id: string;
  name: string;
  relationship_type: Recipient['relationshipType'];
  phone: string | null;
  note: string | null;
};

const mapRecipient = (row: DbRecipient): Recipient => ({
  id: row.id,
  name: row.name,
  relationshipType: row.relationship_type,
  phone: row.phone ?? undefined,
  note: row.note ?? undefined,
});

export async function fetchRecipients(): Promise<Recipient[]> {
  const { data, error } = await supabase
    .from('recipients')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return (data as DbRecipient[]).map(mapRecipient);
}

export async function createRecipient(payload: Omit<Recipient, 'id'>): Promise<Recipient> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('recipients')
    .insert({
      user_id: userId,
      name: payload.name,
      relationship_type: payload.relationshipType,
      phone: payload.phone ?? null,
      note: payload.note ?? null,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapRecipient(data as DbRecipient);
}

export async function updateRecipient(
  id: string,
  patch: Partial<Omit<Recipient, 'id'>>,
): Promise<Recipient> {
  const dbPatch: Record<string, unknown> = {};

  if (patch.name !== undefined) {
    dbPatch.name = patch.name;
  }
  if (patch.relationshipType !== undefined) {
    dbPatch.relationship_type = patch.relationshipType;
  }
  if (patch.phone !== undefined) {
    dbPatch.phone = patch.phone ?? null;
  }
  if (patch.note !== undefined) {
    dbPatch.note = patch.note ?? null;
  }

  const { data, error } = await supabase
    .from('recipients')
    .update(dbPatch)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapRecipient(data as DbRecipient);
}

export async function deleteRecipient(id: string): Promise<{ success: true }> {
  const { error } = await supabase.from('recipients').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return { success: true };
}
