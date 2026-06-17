import { DevSettings, I18nManager } from 'react-native';

import { isRtlLocale } from '@/lang';

export const applyRtlLayout = (locale: string): boolean => {
  const shouldUseRtl = isRtlLocale(locale);
  const rtlChanged = I18nManager.isRTL !== shouldUseRtl;

  I18nManager.allowRTL(shouldUseRtl);
  I18nManager.forceRTL(shouldUseRtl);

  return rtlChanged;
};

export const syncRtlWithLocale = (locale: string) => {
  applyRtlLayout(locale);
};

export const reloadApp = () => {
  if (__DEV__ && DevSettings?.reload) {
    DevSettings.reload();
  }
};
