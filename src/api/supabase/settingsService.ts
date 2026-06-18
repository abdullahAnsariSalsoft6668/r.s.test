import { supabase } from '@/supabase';
import { DEFAULT_CURRENCY, isAppCurrency, type AppCurrency } from '@/constants/currency';
import type { CalculationBasis, GivingSettings } from '@/models/finance.types';

import { getCurrentUserId } from './getCurrentUserId';

type DbGivingSettings = {
  user_id: string;
  donation_percent: number;
  calculation_basis: CalculationBasis;
};

type DbProfile = {
  id: string;
  full_name: string | null;
  email: string | null;
  preferred_currency: string;
};

const mapGivingSettings = (row: DbGivingSettings): GivingSettings => ({
  userId: row.user_id,
  donationPercent: Number(row.donation_percent),
  calculationBasis: row.calculation_basis,
});

export type UpdateGivingSettingsPayload = Pick<
  GivingSettings,
  'donationPercent' | 'calculationBasis'
>;

export async function fetchGivingSettings(): Promise<GivingSettings> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('giving_settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw error;
  }

  return mapGivingSettings(data as DbGivingSettings);
}

export async function updateGivingSettings(
  payload: UpdateGivingSettingsPayload,
): Promise<GivingSettings> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('giving_settings')
    .update({
      donation_percent: payload.donationPercent,
      calculation_basis: payload.calculationBasis,
    })
    .eq('user_id', userId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapGivingSettings(data as DbGivingSettings);
}

export async function fetchProfile(): Promise<{
  fullName: string;
  email: string | null;
  preferredCurrency: AppCurrency;
}> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, preferred_currency')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  const profile = data as DbProfile;
  const preferredCurrency = isAppCurrency(profile.preferred_currency)
    ? profile.preferred_currency
    : DEFAULT_CURRENCY;

  return {
    fullName: profile.full_name?.trim() || 'User',
    email: profile.email,
    preferredCurrency,
  };
}

export async function updatePreferredCurrency(currency: AppCurrency): Promise<AppCurrency> {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from('profiles')
    .update({ preferred_currency: currency })
    .eq('id', userId);

  if (error) {
    throw error;
  }

  return currency;
}
