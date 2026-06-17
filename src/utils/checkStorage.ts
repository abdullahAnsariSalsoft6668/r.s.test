/**
 * @file checkStorage.ts
 * @description Utility functions for managing and retrieving persisted application state from secure storage.
 * This module is responsible for initializing the app with user preferences stored in secure storage.
 */

import { hydrateAuthFromSecureStorage } from "@/redux/actions/auth";
import { changeFirstTime } from "@/redux/reducers/auth";
import { LanguageInterface, saveDefaultCurrency, saveDefaultLanguage, saveDefaultTheme } from "@/redux/reducers/settings";
import store from "@/redux/store";
import i18n, { isRtlLocale } from "@/lang";
import { isAppCurrency, DEFAULT_CURRENCY } from "@/constants/currency";
import { mockStore } from "@/api/mock/mockStore";
import { syncRtlWithLocale } from "@/utils/rtl";
import { I18nManager } from "react-native";
import { secureStorage } from "./secureStorage";
const { dispatch } = store;

/**
 * Retrieves persisted application state from secure storage and initializes the Redux store.
 * 
 * @async
 * @function getLocalItem
 * @description This function runs at application startup to:
 *  1. Check if the app is running for the first time
 *  2. Load and apply the user's preferred language
 *  3. Load and apply the user's preferred theme
 * 
 * @throws {Error} Will log any errors encountered during retrieval or dispatch
 * @returns {Promise<void>}
 * 
 * @example
 * // Called in App.tsx useEffect
 * getLocalItem();
 */
export const getLocalItem = async () => {
    try {
        await hydrateAuthFromSecureStorage();

        // Check if this is the first time the app has been run
        const isFirstTimeStored = await secureStorage.getItem('IS_FIRST_TIME');

        console.log('isFirstTime', isFirstTimeStored);

        // Fresh install → show onboarding; persisted 'false' → go straight to login.
        dispatch(changeFirstTime(isFirstTimeStored === null || isFirstTimeStored === 'true'));

        const language = await secureStorage.getObject<LanguageInterface>('LANGUAGE');
        console.log('language', language);

        const theme = await secureStorage.getItem('THEME');
        console.log('theme', theme);

        const currency = await secureStorage.getItem('CURRENCY');
        console.log('currency', currency);

        const locale = language?.sortName ?? 'en';

        // Apply RTL layout before first render based on saved language
        syncRtlWithLocale(locale);

        // Apply saved language if it exists
        if (language) {
            await i18n.changeLanguage(locale);
            dispatch(saveDefaultLanguage(language));
        } else {
            I18nManager.allowRTL(isRtlLocale('en'));
            I18nManager.forceRTL(false);
            await i18n.changeLanguage('en');
        }

        // Apply saved theme if it exists, otherwise set default dark theme
        if (theme) {
            dispatch(saveDefaultTheme({ myTheme: theme }));
        } else {
            const defaultTheme = 'dark';
            await secureStorage.setItem('THEME', defaultTheme);
            dispatch(saveDefaultTheme({ myTheme: defaultTheme }));
        }

        const resolvedCurrency = currency && isAppCurrency(currency) ? currency : DEFAULT_CURRENCY;
        mockStore.setPreferredCurrency(resolvedCurrency);
        dispatch(saveDefaultCurrency(resolvedCurrency));
        if (!currency || !isAppCurrency(currency)) {
            await secureStorage.setItem('CURRENCY', resolvedCurrency);
        }
    } catch (error) {
        console.log(error);
    }
}
