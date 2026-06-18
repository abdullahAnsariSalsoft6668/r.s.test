import * as Keychain from 'react-native-keychain';

const KEYCHAIN_USERNAME = 'rizqshare';
const SERVICE_PREFIX = 'com.rizqshare.supabase';

function serviceForKey(key: string): string {
  return `${SERVICE_PREFIX}.${key}`;
}

export const supabaseAuthStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: serviceForKey(key),
      });
      return credentials ? credentials.password : null;
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    await Keychain.setGenericPassword(KEYCHAIN_USERNAME, value, {
      service: serviceForKey(key),
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
  },
  removeItem: async (key: string): Promise<void> => {
    await Keychain.resetGenericPassword({ service: serviceForKey(key) });
  },
};
