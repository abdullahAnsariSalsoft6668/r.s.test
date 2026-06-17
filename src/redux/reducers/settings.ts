/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppCurrency } from "@/constants/currency";
import { DEFAULT_CURRENCY } from "@/constants/currency";

export interface LanguageInterface {
  name: string;
  sortName: string;
}

export interface ThemeInterface {
  myTheme: string;
}

export interface SettingsState {
  languages: Array<LanguageInterface>;
  defaultLanguage: LanguageInterface;
  defaultTheme: ThemeInterface;
  defaultCurrency: AppCurrency;
}

const supportedLanguages: Array<LanguageInterface> = [
  { name: "English", sortName: "en" },
  { name: "Urdu", sortName: "ur" },
  { name: "Roman Urdu", sortName: "ur-roman" },
];

const initialState: SettingsState = {
  languages: supportedLanguages,
  defaultLanguage: supportedLanguages[0],
  defaultTheme: { myTheme: "dark" },
  defaultCurrency: DEFAULT_CURRENCY,
};

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    saveDefaultLanguage: (state, action: PayloadAction<LanguageInterface>) => {
      const languageExists = state.languages.some(
        (lang) => lang.sortName === action.payload.sortName,
      );
      if (languageExists) {
        state.defaultLanguage = action.payload;
      } else {
        console.error("Language not found in the list.");
      }
    },
    saveDefaultTheme: (state, action: PayloadAction<ThemeInterface>) => {
      state.defaultTheme = action.payload;
    },
    saveDefaultCurrency: (state, action: PayloadAction<AppCurrency>) => {
      state.defaultCurrency = action.payload;
    },
  },
});

export const { saveDefaultLanguage, saveDefaultTheme, saveDefaultCurrency } = settingSlice.actions;

export default settingSlice.reducer;
