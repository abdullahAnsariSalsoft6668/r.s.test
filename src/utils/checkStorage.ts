/**
 * @file checkStorage.ts
 * @description Initializes Redux from MMKV (preferences) and Keychain (auth session).
 */

import { restoreSupabaseSession } from '@/api/supabase/authService';
import { USE_MOCK_FINANCE_API } from '@/config/supabase';
import { hydrateAuthFromSecureStorage } from '@/redux/actions/auth';
import { changeFirstTime, clearData } from '@/redux/reducers/auth';
import {
  LanguageInterface,
  saveDefaultCurrency,
  saveDefaultLanguage,
  saveDefaultTheme,
} from '@/redux/reducers/settings';
import store from '@/redux/store';
import i18n, { isRtlLocale } from '@/lang';
import { isAppCurrency, DEFAULT_CURRENCY } from '@/constants/currency';
import { mockStore } from '@/api/mock/mockStore';
import { mmkvStorage, runStorageMigrationIfNeeded, secureStorage, clearAuthSession } from '@/storage';
import { syncRtlWithLocale } from '@/utils/rtl';
import { I18nManager } from 'react-native';

const { dispatch } = store;

const DEMO_ACCESS_TOKEN = 'alpha-static-token';
const DEMO_REFRESH_TOKEN = 'alpha-static-refresh';

async function clearStaleAuthSession(): Promise<void> {
  await clearAuthSession();
  dispatch(clearData());
}

export const getLocalItem = async () => {
  try {
    await runStorageMigrationIfNeeded();
    await hydrateAuthFromSecureStorage();

    if (!USE_MOCK_FINANCE_API) {
      const accessToken = (await secureStorage.getItem('AUTH_TOKEN')) ?? '';
      const refreshToken = (await secureStorage.getItem('REFRESH_TOKEN')) ?? '';

      if (
        accessToken === DEMO_ACCESS_TOKEN ||
        refreshToken === DEMO_REFRESH_TOKEN
      ) {
        await clearStaleAuthSession();
      } else if (accessToken && refreshToken) {
        try {
          await restoreSupabaseSession(accessToken, refreshToken);
        } catch (sessionError) {
          console.log('[checkStorage] supabase session restore failed', sessionError);
          await clearStaleAuthSession();
        }
      }
    }

    const isFirstTimeStored = mmkvStorage.getItem('IS_FIRST_TIME');
    dispatch(changeFirstTime(isFirstTimeStored === undefined || isFirstTimeStored === 'true'));

    const language = mmkvStorage.getObject<LanguageInterface>('LANGUAGE');
    const theme = mmkvStorage.getItem('THEME');
    const currency = mmkvStorage.getItem('CURRENCY');
    const locale = language?.sortName ?? 'en';

    syncRtlWithLocale(locale);

    if (language) {
      await i18n.changeLanguage(locale);
      dispatch(saveDefaultLanguage(language));
    } else {
      I18nManager.allowRTL(isRtlLocale('en'));
      I18nManager.forceRTL(false);
      await i18n.changeLanguage('en');
    }

    if (theme) {
      dispatch(saveDefaultTheme({ myTheme: theme }));
    } else {
      const defaultTheme = 'dark';
      mmkvStorage.setItem('THEME', defaultTheme);
      dispatch(saveDefaultTheme({ myTheme: defaultTheme }));
    }

    const resolvedCurrency = currency && isAppCurrency(currency) ? currency : DEFAULT_CURRENCY;
    mockStore.setPreferredCurrency(resolvedCurrency);
    dispatch(saveDefaultCurrency(resolvedCurrency));
    if (!currency || !isAppCurrency(currency)) {
      mmkvStorage.setItem('CURRENCY', resolvedCurrency);
    }
  } catch (error) {
    console.log('[checkStorage] bootstrap failed');
  }
};
