import { secureStorage } from "@/utils/secureStorage";
import type { AppCurrency } from "@/constants/currency";
import { mockStore } from "@/api/mock/mockStore";
import { baseApi } from "@/api/baseApi";
import { LanguageInterface, saveDefaultCurrency, saveDefaultLanguage, saveDefaultTheme } from "../reducers/settings";
import store from "../store";
import { ThemeMode } from "@/typings/global";
import i18n from "@/lang";

const { dispatch } = store;

export const changeLanguageState = (language: LanguageInterface) => {
    secureStorage.setObject("LANGUAGE", language).then(() => {
        i18n.changeLanguage(language.sortName);
        dispatch(saveDefaultLanguage({ name: language.name, sortName: language.sortName }))
    })
};

export const changeThemeState = (theme: ThemeMode) => {
    secureStorage.setItem("THEME", theme).then(() => {
        dispatch(saveDefaultTheme({ myTheme: theme }))
    })
};

export const changeCurrencyState = (currency: AppCurrency) => {
    mockStore.setPreferredCurrency(currency);
    secureStorage.setItem("CURRENCY", currency).then(() => {
        dispatch(saveDefaultCurrency(currency));
        dispatch(baseApi.util.invalidateTags(['Dashboard']));
    });
};
