import { mmkvStorage } from './mmkv';
import { MMKV_KEYS, SECURE_KEYS } from './keys';
import { clearSecureAuth, clearSecureData, secureStorage } from './secureStorage';
import { runStorageMigrationIfNeeded } from './migration';

export { mmkvStorage } from './mmkv';
export { secureStorage, saveSecureData, getSecureData, deleteSecureData } from './secureStorage';
export { MMKV_KEYS, SECURE_KEYS, STORAGE_MIGRATION_VERSION } from './keys';
export type { MmkvKey, SecureKey } from './keys';
export { runStorageMigrationIfNeeded };

/** Clears auth/session from Keychain only — preserves MMKV preferences. */
export async function clearAuthSession(): Promise<void> {
  await clearSecureAuth();
}

/** Full reset: MMKV preferences + all Keychain entries. */
export async function clearAllAppData(): Promise<void> {
  mmkvStorage.clear();
  await clearSecureData();
}

/** @deprecated Use MMKV_KEYS / SECURE_KEYS instead. */
export const STORAGE_KEYS = {
  ...MMKV_KEYS,
  ...SECURE_KEYS,
} as const;

export type StorageKeyType = keyof typeof STORAGE_KEYS;
