import * as Keychain from 'react-native-keychain';

import { SECURE_KEYS, type SecureKey } from './keys';

const KEYCHAIN_USERNAME = 'rizqshare';
const SERVICE_PREFIX = 'com.rizqshare.secure';

function serviceForKey(key: SecureKey): string {
  return `${SERVICE_PREFIX}.${SECURE_KEYS[key]}`;
}

export async function saveSecureData(key: SecureKey, value: string): Promise<void> {
  try {
    await Keychain.setGenericPassword(KEYCHAIN_USERNAME, value, {
      service: serviceForKey(key),
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
  } catch (error) {
    console.log(`[secureStorage] failed to save key: ${key}`);
  }
}

export async function getSecureData(key: SecureKey): Promise<string | null> {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: serviceForKey(key),
    });
    if (!credentials) {
      return null;
    }
    return credentials.password;
  } catch (error) {
    console.log(`[secureStorage] failed to read key: ${key}`);
    return null;
  }
}

export async function deleteSecureData(key: SecureKey): Promise<void> {
  try {
    await Keychain.resetGenericPassword({ service: serviceForKey(key) });
  } catch (error) {
    console.log(`[secureStorage] failed to delete key: ${key}`);
  }
}

export async function setSecureObject(key: SecureKey, value: object): Promise<void> {
  await saveSecureData(key, JSON.stringify(value));
}

export async function getSecureObject<T>(key: SecureKey): Promise<T | null> {
  const raw = await getSecureData(key);
  if (raw == null) {
    return null;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function clearSecureAuth(): Promise<void> {
  await Promise.all(
    (Object.keys(SECURE_KEYS) as SecureKey[]).map((key) => deleteSecureData(key)),
  );
}

export async function clearSecureData(): Promise<void> {
  await clearSecureAuth();
}

/** App-facing secure storage API (auth/session only). */
export const secureStorage = {
  setItem: saveSecureData,
  getItem: getSecureData,
  removeItem: deleteSecureData,
  setObject: setSecureObject,
  getObject: getSecureObject,
};
