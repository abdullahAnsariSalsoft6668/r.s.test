import Config from 'react-native-config';

type EnvKey = 'SUPABASE_URL' | 'SUPABASE_KEY';

function requireEnv(key: EnvKey): string {
  const value = Config[key]?.trim();
  if (!value) {
    throw new Error(`Missing ${key} in .env`);
  }
  return value;
}

export const SUPABASE_URL = requireEnv('SUPABASE_URL');
export const SUPABASE_KEY = requireEnv('SUPABASE_KEY');
