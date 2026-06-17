import type { AppCurrency } from '@/constants/currency';
import { DEFAULT_CURRENCY } from '@/constants/currency';
import type {
  DashboardSummary,
  DonationEntry,
  ExpenseCategory,
  ExpenseEntry,
  GivingSettings,
  IncomeCategory,
  IncomeEntry,
  Recipient,
} from '@/models/finance.types';
import {
  buildCategoryMap,
  buildDashboardSummary,
  buildMonthlyTrends,
  buildRecipientMap,
  buildUnifiedTransactions,
  computeGivingScore,
} from '@/utils/donationCalculations';

import {
  financeSeed,
  seedDonations,
  seedExpenseCategories,
  seedExpenses,
  seedGivingSettings,
  seedIncomeCategories,
  seedIncomes,
  seedRecipients,
} from './financeSeed';

let givingSettings: GivingSettings = { ...seedGivingSettings };
let recipients: Recipient[] = seedRecipients.map((item) => ({ ...item }));
let donations: DonationEntry[] = seedDonations.map((item) => ({ ...item }));
let incomes: IncomeEntry[] = seedIncomes.map((item) => ({ ...item }));
let expenses: ExpenseEntry[] = seedExpenses.map((item) => ({ ...item }));
let incomeCategories: IncomeCategory[] = seedIncomeCategories.map((item) => ({ ...item }));
let expenseCategories: ExpenseCategory[] = seedExpenseCategories.map((item) => ({ ...item }));
let preferredCurrency: AppCurrency = DEFAULT_CURRENCY;

const createId = (prefix: string): string =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const mockStore = {
  getPreferredCurrency(): AppCurrency {
    return preferredCurrency;
  },

  setPreferredCurrency(currency: AppCurrency): AppCurrency {
    preferredCurrency = currency;
    return preferredCurrency;
  },

  getGivingSettings(): GivingSettings {
    return { ...givingSettings };
  },

  updateGivingSettings(partial: Partial<GivingSettings>): GivingSettings {
    givingSettings = { ...givingSettings, ...partial };
    return { ...givingSettings };
  },

  getRecipients(): Recipient[] {
    return recipients.map((item) => ({ ...item }));
  },

  getRecipientById(id: string): Recipient | undefined {
    const found = recipients.find((item) => item.id === id);
    return found ? { ...found } : undefined;
  },

  addRecipient(payload: Omit<Recipient, 'id'>): Recipient {
    const entry: Recipient = { id: createId('rec'), ...payload };
    recipients = [...recipients, entry];
    return { ...entry };
  },

  updateRecipient(id: string, payload: Partial<Omit<Recipient, 'id'>>): Recipient {
    const index = recipients.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Recipient not found');
    }
    const updated = { ...recipients[index], ...payload };
    recipients = recipients.map((item) => (item.id === id ? updated : item));
    return { ...updated };
  },

  deleteRecipient(id: string): boolean {
    const before = recipients.length;
    recipients = recipients.filter((item) => item.id !== id);
    donations = donations.filter((item) => item.recipientId !== id);
    return recipients.length < before;
  },

  getDonations(): DonationEntry[] {
    return donations.map((item) => ({ ...item }));
  },

  addDonation(payload: Omit<DonationEntry, 'id'>): DonationEntry {
    const entry: DonationEntry = {
      id: createId('don'),
      currency: preferredCurrency,
      ...payload,
    };
    donations = [entry, ...donations];
    return { ...entry };
  },

  updateDonation(id: string, payload: Partial<Omit<DonationEntry, 'id'>>): DonationEntry {
    const index = donations.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Donation not found');
    }
    const updated = { ...donations[index], ...payload };
    donations = donations.map((item) => (item.id === id ? updated : item));
    return { ...updated };
  },

  deleteDonation(id: string): boolean {
    const before = donations.length;
    donations = donations.filter((item) => item.id !== id);
    return donations.length < before;
  },

  getIncomes(): IncomeEntry[] {
    return incomes.map((item) => ({ ...item }));
  },

  getExpenses(): ExpenseEntry[] {
    return expenses.map((item) => ({ ...item }));
  },

  incomes: {
    getAll(): IncomeEntry[] {
      return incomes.map((item) => ({ ...item }));
    },
    add(payload: Omit<IncomeEntry, 'id'>): IncomeEntry {
      const entry: IncomeEntry = { id: createId('inc'), currency: preferredCurrency, ...payload };
      incomes = [entry, ...incomes];
      return { ...entry };
    },
    update(id: string, patch: Partial<Omit<IncomeEntry, 'id'>>): IncomeEntry | null {
      const index = incomes.findIndex((item) => item.id === id);
      if (index === -1) return null;
      const updated = { ...incomes[index], ...patch };
      incomes = incomes.map((item) => (item.id === id ? updated : item));
      return { ...updated };
    },
    remove(id: string): boolean {
      const before = incomes.length;
      incomes = incomes.filter((item) => item.id !== id);
      return incomes.length < before;
    },
  },

  incomeCategories: {
    getAll(): IncomeCategory[] {
      return incomeCategories.map((item) => ({ ...item }));
    },
    add(name: string): IncomeCategory {
      const entry: IncomeCategory = { id: createId('cat'), name, isDefault: false };
      incomeCategories = [...incomeCategories, entry];
      return { ...entry };
    },
  },

  expenses: {
    getAll(): ExpenseEntry[] {
      return expenses.map((item) => ({ ...item }));
    },
    add(payload: Omit<ExpenseEntry, 'id'>): ExpenseEntry {
      const entry: ExpenseEntry = { id: createId('exp'), currency: preferredCurrency, ...payload };
      expenses = [entry, ...expenses];
      return { ...entry };
    },
    update(id: string, patch: Partial<Omit<ExpenseEntry, 'id'>>): ExpenseEntry | null {
      const index = expenses.findIndex((item) => item.id === id);
      if (index === -1) return null;
      const updated = { ...expenses[index], ...patch };
      expenses = expenses.map((item) => (item.id === id ? updated : item));
      return { ...updated };
    },
    remove(id: string): boolean {
      const before = expenses.length;
      expenses = expenses.filter((item) => item.id !== id);
      return expenses.length < before;
    },
  },

  expenseCategories: {
    getAll(): ExpenseCategory[] {
      return expenseCategories.map((item) => ({ ...item }));
    },
    add(name: string): ExpenseCategory {
      const entry: ExpenseCategory = { id: createId('expcat'), name, isDefault: false };
      expenseCategories = [...expenseCategories, entry];
      return { ...entry };
    },
  },

  getDashboardSummary(): DashboardSummary {
    return buildDashboardSummary(incomes, expenses, donations, givingSettings, new Date(), preferredCurrency);
  },

  getTransactions() {
    return buildUnifiedTransactions(
      incomes,
      expenses,
      donations,
      buildCategoryMap(incomeCategories),
      buildCategoryMap(expenseCategories),
      buildRecipientMap(recipients),
    );
  },

  getAnalytics() {
    const currentMonth = buildDashboardSummary(
      incomes,
      expenses,
      donations,
      givingSettings,
      new Date(),
      preferredCurrency,
    );
    const previousDate = new Date();
    previousDate.setMonth(previousDate.getMonth() - 1);
    const previousMonth = buildDashboardSummary(
      incomes,
      expenses,
      donations,
      givingSettings,
      previousDate,
      preferredCurrency,
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
  },

  getUserName(): string {
    return financeSeed.userName;
  },

  reset(): void {
    givingSettings = { ...seedGivingSettings };
    recipients = seedRecipients.map((item) => ({ ...item }));
    donations = seedDonations.map((item) => ({ ...item }));
    incomes = seedIncomes.map((item) => ({ ...item }));
    expenses = seedExpenses.map((item) => ({ ...item }));
    incomeCategories = seedIncomeCategories.map((item) => ({ ...item }));
    expenseCategories = seedExpenseCategories.map((item) => ({ ...item }));
    preferredCurrency = DEFAULT_CURRENCY;
  },
};
