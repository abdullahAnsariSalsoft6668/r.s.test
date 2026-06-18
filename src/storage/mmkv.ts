import { createMMKV } from 'react-native-mmkv';

import { MMKV_KEYS, type MmkvKey } from './keys';

const storage = createMMKV({ id: 'rizqshare-app' });

function resolveKey(key: MmkvKey): string {
  return MMKV_KEYS[key];
}

export const mmkvStorage = {
  setItem(key: MmkvKey, value: string | number | boolean): void {
    try {
      storage.set(resolveKey(key), value);
    } catch {
      // Never throw to callers
    }
  },

  getItem(key: MmkvKey): string | undefined {
    try {
      const value = storage.getString(resolveKey(key));
      return value ?? undefined;
    } catch {
      return undefined;
    }
  },

  setObject(key: MmkvKey, value: object): void {
    try {
      storage.set(resolveKey(key), JSON.stringify(value));
    } catch {
      // Never throw to callers
    }
  },

  getObject<T>(key: MmkvKey): T | null {
    try {
      const raw = storage.getString(resolveKey(key));
      if (raw == null) {
        return null;
      }
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  removeItem(key: MmkvKey): void {
    try {
      storage.remove(resolveKey(key));
    } catch {
      // Never throw to callers
    }
  },

  clear(): void {
    try {
      storage.clearAll();
    } catch {
      // Never throw to callers
    }
  },

  getMigrationVersion(): number {
    try {
      return storage.getNumber(MMKV_KEYS.STORAGE_MIGRATION_VERSION) ?? 0;
    } catch {
      return 0;
    }
  },

  setMigrationVersion(version: number): void {
    try {
      storage.set(MMKV_KEYS.STORAGE_MIGRATION_VERSION, version);
    } catch {
      // Never throw to callers
    }
  },
};
