import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import ur from './ur.json';
import urRoman from './ur-roman.json';

export const SUPPORTED_LOCALES = ['en', 'ur', 'ur-roman'] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const RTL_LOCALES: AppLocale[] = ['ur'];

export const isRtlLocale = (locale: string): boolean => RTL_LOCALES.includes(locale as AppLocale);

const resources = {
  en: { translation: en },
  ur: { translation: ur },
  'ur-roman': { translation: urRoman },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
