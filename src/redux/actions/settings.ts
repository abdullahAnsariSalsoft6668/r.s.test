import type { AppCurrency } from '@/constants/currency';
import { mockStore } from '@/api/mock/mockStore';
import { baseApi } from '@/api/baseApi';
import {
  LanguageInterface,
  saveDefaultCurrency,
  saveDefaultLanguage,
  saveDefaultTheme,
} from '../reducers/settings';
import store from '../store';
import { ThemeMode } from '@/typings/global';
import i18n from '@/lang';
import { mmkvStorage } from '@/storage';

const { dispatch } = store;

export const changeLanguageState = (language: LanguageInterface) => {
  mmkvStorage.setObject('LANGUAGE', language);
  i18n.changeLanguage(language.sortName);
  dispatch(saveDefaultLanguage({ name: language.name, sortName: language.sortName }));
};

export const changeThemeState = (theme: ThemeMode) => {
  mmkvStorage.setItem('THEME', theme);
  dispatch(saveDefaultTheme({ myTheme: theme }));
};

export const changeCurrencyState = (currency: AppCurrency) => {
  mockStore.setPreferredCurrency(currency);
  mmkvStorage.setItem('CURRENCY', currency);
  dispatch(saveDefaultCurrency(currency));
  dispatch(baseApi.util.invalidateTags(['Dashboard']));
};
