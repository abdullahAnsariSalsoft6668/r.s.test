import type { AppCurrency } from '@/constants/currency';
import { DEFAULT_CURRENCY, formatCurrency as formatCurrencyValue } from '@/constants/currency';
import type {
  DashboardSummary,
  DonationEntry,
  ExpenseEntry,
  GivingSettings,
  IncomeEntry,
  MonthlyTrend,
  UnifiedTransaction,
} from '@/models/finance.types';

export { formatCurrencyValue as formatCurrency };

export function getCurrentMonthYear(referenceDate = new Date()): { year: number; month: number } {
  return {
    year: referenceDate.getFullYear(),
    month: referenceDate.getMonth() + 1,
  };
}

export function filterByMonth<T extends { date: string }>(
  entries: T[],
  year: number,
  month: number,
): T[] {
  return entries.filter((entry) => {
    const parsed = new Date(entry.date);
    return parsed.getFullYear() === year && parsed.getMonth() + 1 === month;
  });
}

export function monthlyIncome(
  incomes: IncomeEntry[],
  year?: number,
  month?: number,
  referenceDate = new Date(),
): number {
  const { year: y, month: m } =
    year !== undefined && month !== undefined
      ? { year, month }
      : getCurrentMonthYear(referenceDate);

  return filterByMonth(incomes, y, m).reduce((sum, entry) => sum + entry.amount, 0);
}

export function monthlyExpenses(
  expenses: ExpenseEntry[],
  year?: number,
  month?: number,
  referenceDate = new Date(),
): number {
  const { year: y, month: m } =
    year !== undefined && month !== undefined
      ? { year, month }
      : getCurrentMonthYear(referenceDate);

  return filterByMonth(expenses, y, m).reduce((sum, entry) => sum + entry.amount, 0);
}

export function donationTarget(monthlyIncomeTotal: number, donationPercent: number): number {
  return monthlyIncomeTotal * (donationPercent / 100);
}

export function donationProgress(
  donations: DonationEntry[],
  year?: number,
  month?: number,
  referenceDate = new Date(),
): number {
  const { year: y, month: m } =
    year !== undefined && month !== undefined
      ? { year, month }
      : getCurrentMonthYear(referenceDate);

  return filterByMonth(donations, y, m).reduce((sum, entry) => sum + entry.amount, 0);
}

export function yearlyDonationProgress(
  donations: DonationEntry[],
  year?: number,
  referenceDate = new Date(),
): number {
  const targetYear = year ?? referenceDate.getFullYear();
  return donations
    .filter((entry) => new Date(entry.date).getFullYear() === targetYear)
    .reduce((sum, entry) => sum + entry.amount, 0);
}

export function remainingToGoal(target: number, progress: number): number {
  return Math.max(0, target - progress);
}

export function donationProgressRatio(target: number, progress: number): number {
  if (target <= 0) {
    return progress > 0 ? 1 : 0;
  }
  return Math.min(1, progress / target);
}

export function savings(
  monthlyIncomeTotal: number,
  monthlyExpensesTotal: number,
  monthlyDonationsTotal: number,
): number {
  return monthlyIncomeTotal - monthlyExpensesTotal - monthlyDonationsTotal;
}

export function buildDashboardSummary(
  incomes: IncomeEntry[],
  expenses: ExpenseEntry[],
  donations: DonationEntry[],
  settings: GivingSettings,
  referenceDate = new Date(),
  currency: AppCurrency = DEFAULT_CURRENCY,
): DashboardSummary {
  const income = monthlyIncome(incomes, undefined, undefined, referenceDate);
  const expensesTotal = monthlyExpenses(expenses, undefined, undefined, referenceDate);
  const progress = donationProgress(donations, undefined, undefined, referenceDate);
  const target = donationTarget(income, settings.donationPercent);
  const remaining = remainingToGoal(target, progress);

  return {
    balance: savings(income, expensesTotal, progress),
    monthlyIncome: income,
    monthlyExpenses: expensesTotal,
    monthlyDonations: progress,
    donationTarget: target,
    donationProgress: progress,
    remaining,
    donationRate: settings.donationPercent,
    savings: savings(income, expensesTotal, progress),
    currency,
  };
}

export function buildCategoryMap(
  categories: { id: string; name: string }[],
): Record<string, string> {
  return categories.reduce<Record<string, string>>((map, category) => {
    map[category.id] = category.name;
    return map;
  }, {});
}

export function buildRecipientMap(
  recipients: { id: string; name: string }[],
): Record<string, string> {
  return recipients.reduce<Record<string, string>>((map, recipient) => {
    map[recipient.id] = recipient.name;
    return map;
  }, {});
}

export function buildUnifiedTransactions(
  incomes: IncomeEntry[],
  expenses: ExpenseEntry[],
  donations: DonationEntry[],
  incomeCategoryMap: Record<string, string>,
  expenseCategoryMap: Record<string, string>,
  recipientMap: Record<string, string>,
): UnifiedTransaction[] {
  const incomeTx = incomes.map((entry) => ({
    id: entry.id,
    type: 'income' as const,
    amount: entry.amount,
    date: entry.date,
    label: incomeCategoryMap[entry.categoryId] ?? 'Income',
    categoryOrRecipient: entry.note,
  }));

  const expenseTx = expenses.map((entry) => ({
    id: entry.id,
    type: 'expense' as const,
    amount: entry.amount,
    date: entry.date,
    label: expenseCategoryMap[entry.categoryId] ?? 'Expense',
    categoryOrRecipient: entry.note,
  }));

  const donationTx = donations.map((entry) => ({
    id: entry.id,
    type: 'donation' as const,
    amount: entry.amount,
    date: entry.date,
    label: recipientMap[entry.recipientId] ?? 'Donation',
    categoryOrRecipient: entry.type,
  }));

  return [...incomeTx, ...expenseTx, ...donationTx].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function buildMonthlyTrends(
  incomes: IncomeEntry[],
  expenses: ExpenseEntry[],
  donations: DonationEntry[],
  months = 6,
  referenceDate = new Date(),
): MonthlyTrend[] {
  const trends: MonthlyTrend[] = [];

  for (let i = months - 1; i >= 0; i -= 1) {
    const date = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - i, 1);
    const monthLabel = date.toLocaleString('en-US', { month: 'short', year: '2-digit' });
    const income = monthlyIncome(incomes, date.getFullYear(), date.getMonth() + 1, date);
    const expenseTotal = monthlyExpenses(expenses, date.getFullYear(), date.getMonth() + 1, date);
    const donationTotal = donationProgress(donations, date.getFullYear(), date.getMonth() + 1, date);

    trends.push({
      month: monthLabel,
      income,
      expenses: expenseTotal,
      donations: donationTotal,
      savings: savings(income, expenseTotal, donationTotal),
    });
  }

  return trends;
}

export function computeGivingScore(target: number, progress: number): number {
  if (target <= 0) {
    return progress > 0 ? 100 : 0;
  }
  return Math.round(Math.min(1, progress / target) * 100);
}
