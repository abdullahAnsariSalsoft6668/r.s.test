import type { AppCurrency } from '@/constants/currency';
import { CURRENCY_META, SUPPORTED_CURRENCIES } from '@/constants/currency';
import { changeCurrencyState } from '@/redux/actions/settings';
import { useSelector } from '@/redux/hooks';
import { formatCurrency } from '@/utils/donationCalculations';

export const useCurrency = () => {
  const currentCurrency = useSelector((state) => state.settings.defaultCurrency);

  const changeCurrency = (currency: AppCurrency) => {
    if (currency === currentCurrency) {
      return;
    }
    changeCurrencyState(currency);
  };

  const currencies = SUPPORTED_CURRENCIES.map((code) => ({
    code,
    labelKey: CURRENCY_META[code].labelKey,
    symbol: CURRENCY_META[code].symbol,
  }));

  return {
    currentCurrency,
    currencies,
    changeCurrency,
    formatAmount: (amount: number) => formatCurrency(amount, currentCurrency),
  };
};
