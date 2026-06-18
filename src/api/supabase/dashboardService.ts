import { DEFAULT_CURRENCY } from '@/constants/currency';
import type { DashboardSummary, UnifiedTransaction } from '@/models/finance.types';
import {
  buildCategoryMap,
  buildDashboardSummary,
  buildMonthlyTrends,
  buildRecipientMap,
  buildUnifiedTransactions,
  computeGivingScore,
} from '@/utils/donationCalculations';

import { fetchExpenseCategories, fetchIncomeCategories } from './categoryService';
import { fetchDonations } from './donationService';
import { fetchExpenses } from './expenseService';
import { fetchIncomes } from './incomeService';
import { fetchRecipients } from './recipientService';
import { fetchGivingSettings, fetchProfile } from './settingsService';

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [incomes, expenses, donations, settings, profile] = await Promise.all([
    fetchIncomes(),
    fetchExpenses(),
    fetchDonations(),
    fetchGivingSettings(),
    fetchProfile(),
  ]);

  return buildDashboardSummary(
    incomes,
    expenses,
    donations,
    settings,
    new Date(),
    profile.preferredCurrency ?? DEFAULT_CURRENCY,
  );
}

export async function getTransactions(): Promise<UnifiedTransaction[]> {
  const [incomes, expenses, donations, incomeCategories, expenseCategories, recipients] =
    await Promise.all([
      fetchIncomes(),
      fetchExpenses(),
      fetchDonations(),
      fetchIncomeCategories(),
      fetchExpenseCategories(),
      fetchRecipients(),
    ]);

  return buildUnifiedTransactions(
    incomes,
    expenses,
    donations,
    buildCategoryMap(incomeCategories),
    buildCategoryMap(expenseCategories),
    buildRecipientMap(recipients),
  );
}

export async function getUserName(): Promise<string> {
  const profile = await fetchProfile();
  return profile.fullName;
}

export async function getAnalytics() {
  const [incomes, expenses, donations, settings, profile] = await Promise.all([
    fetchIncomes(),
    fetchExpenses(),
    fetchDonations(),
    fetchGivingSettings(),
    fetchProfile(),
  ]);

  const currency = profile.preferredCurrency ?? DEFAULT_CURRENCY;
  const currentMonth = buildDashboardSummary(
    incomes,
    expenses,
    donations,
    settings,
    new Date(),
    currency,
  );

  const previousDate = new Date();
  previousDate.setMonth(previousDate.getMonth() - 1);

  const previousMonth = buildDashboardSummary(
    incomes,
    expenses,
    donations,
    settings,
    previousDate,
    currency,
  );

  const trends = buildMonthlyTrends(incomes, expenses, donations);
  const givingScore = computeGivingScore(
    currentMonth.donationTarget,
    currentMonth.donationProgress,
  );

  return {
    trends,
    givingScore,
    currentMonth,
    previousMonth,
    givingStreak: 3,
    aiInsight: 'givingCoachShort',
  };
}
