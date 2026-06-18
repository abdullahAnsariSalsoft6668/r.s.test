/** Non-sensitive keys stored in MMKV. */
export const MMKV_KEYS = {
  IS_FIRST_TIME: 'is_first_time',
  LANGUAGE: 'language',
  THEME: 'theme',
  CURRENCY: 'currency',
  FCM_TOKEN: 'fcm_token',
  STORAGE_MIGRATION_VERSION: 'storage_migration_version',
} as const;

/** Sensitive keys stored in react-native-keychain. */
export const SECURE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  SELECTED_CHILD: 'selected_child',
  SELECTED_CHILD_ID: 'selected_child_id',
} as const;

/** Legacy rn-secure-storage key names (pre-MMKV migration). */
export const LEGACY_SECURE_KEY_NAMES = {
  IS_FIRST_TIME: 'is_first_time',
  LANGUAGE: 'language',
  THEME: 'theme',
  CURRENCY: 'currency',
  FCM_TOKEN: 'fcm_token',
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  SELECTED_CHILD: 'selected_child',
  SELECTED_CHILD_ID: 'selected_child_id',
} as const;

export const STORAGE_MIGRATION_VERSION = 1;

export type MmkvKey = keyof typeof MMKV_KEYS;
export type SecureKey = keyof typeof SECURE_KEYS;
