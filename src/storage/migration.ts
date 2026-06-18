import { mmkvStorage } from './mmkv';
import { LEGACY_SECURE_KEY_NAMES, STORAGE_MIGRATION_VERSION } from './keys';
import { saveSecureData } from './secureStorage';

type LegacySecureStorageModule = {
  default: {
    getItem: (key: string) => Promise<string | null>;
    removeItem: (key: string) => Promise<void>;
    clear: () => Promise<void>;
  };
  ACCESSIBLE?: { WHEN_UNLOCKED: string };
};

async function readLegacyValue(
  legacy: LegacySecureStorageModule['default'],
  key: string,
): Promise<string | null> {
  try {
    return await legacy.getItem(key);
  } catch {
    return null;
  }
}

async function migrateFromLegacySecureStorage(): Promise<void> {
  let legacyModule: LegacySecureStorageModule | null = null;

  try {
    legacyModule = require('rn-secure-storage') as LegacySecureStorageModule;
  } catch {
    return;
  }

  const legacy = legacyModule.default;
  if (!legacy?.getItem) {
    return;
  }

  const mmkvKeys: Array<{ mmkv: 'IS_FIRST_TIME' | 'LANGUAGE' | 'THEME' | 'CURRENCY' | 'FCM_TOKEN'; legacy: string }> = [
    { mmkv: 'IS_FIRST_TIME', legacy: LEGACY_SECURE_KEY_NAMES.IS_FIRST_TIME },
    { mmkv: 'LANGUAGE', legacy: LEGACY_SECURE_KEY_NAMES.LANGUAGE },
    { mmkv: 'THEME', legacy: LEGACY_SECURE_KEY_NAMES.THEME },
    { mmkv: 'CURRENCY', legacy: LEGACY_SECURE_KEY_NAMES.CURRENCY },
    { mmkv: 'FCM_TOKEN', legacy: LEGACY_SECURE_KEY_NAMES.FCM_TOKEN },
  ];

  for (const { mmkv, legacy: legacyKey } of mmkvKeys) {
    const value = await readLegacyValue(legacy, legacyKey);
    if (value != null && value !== '') {
      mmkvStorage.setItem(mmkv, value);
      try {
        await legacy.removeItem(legacyKey);
      } catch {
        // Best effort cleanup
      }
    }
  }

  const secureKeys: Array<{ secure: 'AUTH_TOKEN' | 'REFRESH_TOKEN' | 'USER_DATA' | 'SELECTED_CHILD' | 'SELECTED_CHILD_ID'; legacy: string }> = [
    { secure: 'AUTH_TOKEN', legacy: LEGACY_SECURE_KEY_NAMES.AUTH_TOKEN },
    { secure: 'REFRESH_TOKEN', legacy: LEGACY_SECURE_KEY_NAMES.REFRESH_TOKEN },
    { secure: 'USER_DATA', legacy: LEGACY_SECURE_KEY_NAMES.USER_DATA },
    { secure: 'SELECTED_CHILD', legacy: LEGACY_SECURE_KEY_NAMES.SELECTED_CHILD },
    { secure: 'SELECTED_CHILD_ID', legacy: LEGACY_SECURE_KEY_NAMES.SELECTED_CHILD_ID },
  ];

  for (const { secure, legacy: legacyKey } of secureKeys) {
    const value = await readLegacyValue(legacy, legacyKey);
    if (value != null && value !== '') {
      await saveSecureData(secure, value);
      try {
        await legacy.removeItem(legacyKey);
      } catch {
        // Best effort cleanup
      }
    }
  }

  try {
    await legacy.clear();
  } catch {
    // Legacy store may already be empty
  }
}

/** One-time migration from rn-secure-storage to MMKV + Keychain. */
export async function runStorageMigrationIfNeeded(): Promise<void> {
  if (mmkvStorage.getMigrationVersion() >= STORAGE_MIGRATION_VERSION) {
    return;
  }

  await migrateFromLegacySecureStorage();
  mmkvStorage.setMigrationVersion(STORAGE_MIGRATION_VERSION);
}
