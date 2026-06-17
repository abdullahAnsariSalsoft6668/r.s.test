import type { LanguageInterface } from '@/redux/reducers/settings';
import { changeLanguageState } from '@/redux/actions/settings';
import { useSelector } from '@/redux/hooks';
import { isRtlLocale } from '@/lang';
import { applyRtlLayout, reloadApp } from '@/utils/rtl';

export const useLanguage = () => {
  const { defaultLanguage, languages } = useSelector((state) => state.settings);

  const changeLanguage = (language: LanguageInterface) => {
    if (language.sortName === defaultLanguage.sortName) {
      return;
    }

    const rtlChanged = applyRtlLayout(language.sortName);
    changeLanguageState(language);

    if (rtlChanged) {
      reloadApp();
    }
  };

  return {
    currentLanguage: defaultLanguage,
    languages,
    changeLanguage,
    isRtl: isRtlLocale(defaultLanguage.sortName),
  };
};
