export const SUPPORTED_CURRENCIES = ['PKR', 'USD', 'INR'] as const;

export type AppCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export const DEFAULT_CURRENCY: AppCurrency = 'PKR';

type CurrencyMeta = {
  code: AppCurrency;
  symbol: string;
  locale: string;
  labelKey: string;
};

export const CURRENCY_META: Record<AppCurrency, CurrencyMeta> = {
  PKR: {
    code: 'PKR',
    symbol: 'Rs',
    locale: 'en-PK',
    labelKey: 'settings.currencyPkr',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
    labelKey: 'settings.currencyUsd',
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    labelKey: 'settings.currencyInr',
  },
};

export const isAppCurrency = (value: string): value is AppCurrency =>
  (SUPPORTED_CURRENCIES as readonly string[]).includes(value);

export function formatCurrency(amount: number, currency: AppCurrency = DEFAULT_CURRENCY): string {
  const meta = CURRENCY_META[currency];
  const formatted = Math.round(amount).toLocaleString(meta.locale);

  if (currency === 'USD') {
    return `${meta.symbol}${formatted}`;
  }

  return `${meta.symbol} ${formatted}`;
}
