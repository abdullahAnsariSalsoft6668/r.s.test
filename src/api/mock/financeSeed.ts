import type {
  DashboardSummary,
  DonationEntry,
  ExpenseEntry,
  ExpenseCategory,
  GivingSettings,
  IncomeCategory,
  IncomeEntry,
  Recipient,
} from '@/models/finance.types';

export const SEED_USER_ID = 'user-ahmed-hassan';

export const seedIncomeCategories: IncomeCategory[] = [
  { id: 'cat-salary', name: 'Salary', isDefault: true },
  { id: 'cat-freelance', name: 'Freelance', isDefault: true },
  { id: 'cat-business', name: 'Business', isDefault: true },
  { id: 'cat-other', name: 'Other', isDefault: true },
];

export const seedExpenseCategories: ExpenseCategory[] = [
  { id: 'exp-groceries', name: 'Groceries', isDefault: true },
  { id: 'exp-rent', name: 'Rent', isDefault: true },
  { id: 'exp-utilities', name: 'Utilities', isDefault: true },
  { id: 'exp-transport', name: 'Transport', isDefault: true },
  { id: 'exp-other', name: 'Other', isDefault: true },
];

export const seedGivingSettings: GivingSettings = {
  userId: SEED_USER_ID,
  donationPercent: 10,
  calculationBasis: 'all_income',
};

export const seedRecipients: Recipient[] = [
  {
    id: 'rec-1',
    name: 'Fatima Hassan',
    relationshipType: 'Relative',
    phone: '+92 300 1234567',
    note: 'Sister',
  },
  {
    id: 'rec-2',
    name: 'Ali Raza',
    relationshipType: 'Friend',
  },
  {
    id: 'rec-3',
    name: 'Edhi Foundation',
    relationshipType: 'Charity',
    note: 'Monthly sadaqah',
  },
  {
    id: 'rec-4',
    name: 'Uncle Kareem',
    relationshipType: 'Relative',
  },
];

export const seedIncomes: IncomeEntry[] = [
  {
    id: 'inc-1',
    amount: 95000,
    categoryId: 'cat-salary',
    date: '2026-06-01',
    note: 'June salary',
    recurring: true,
    currency: 'PKR',
  },
  {
    id: 'inc-2',
    amount: 20000,
    categoryId: 'cat-freelance',
    date: '2026-06-10',
    note: 'Logo design project',
    recurring: false,
    currency: 'PKR',
  },
  {
    id: 'inc-3',
    amount: 10000,
    categoryId: 'cat-business',
    date: '2026-06-05',
    note: 'Online store sales',
    recurring: false,
    currency: 'PKR',
  },
];

export const seedExpenses: ExpenseEntry[] = [
  {
    id: 'exp-1',
    amount: 18000,
    categoryId: 'exp-rent',
    date: '2026-06-01',
    note: 'Monthly rent',
    currency: 'PKR',
  },
  {
    id: 'exp-2',
    amount: 8500,
    categoryId: 'exp-groceries',
    date: '2026-06-08',
    currency: 'PKR',
  },
  {
    id: 'exp-3',
    amount: 3200,
    categoryId: 'exp-utilities',
    date: '2026-06-12',
    currency: 'PKR',
  },
  {
    id: 'exp-4',
    amount: 4500,
    categoryId: 'exp-transport',
    date: '2026-06-15',
    currency: 'PKR',
  },
];

export const seedDonations: DonationEntry[] = [
  {
    id: 'don-1',
    amount: 5000,
    recipientId: 'rec-1',
    type: 'Relative',
    date: '2026-06-03',
    note: 'Monthly support',
    currency: 'PKR',
  },
  {
    id: 'don-2',
    amount: 3000,
    recipientId: 'rec-3',
    type: 'Charity',
    date: '2026-06-14',
    currency: 'PKR',
  },
  {
    id: 'don-3',
    amount: 2000,
    recipientId: 'rec-2',
    type: 'Friend',
    date: '2026-06-16',
    currency: 'PKR',
  },
];

const monthlyIncome = seedIncomes.reduce((sum, entry) => sum + entry.amount, 0);
const monthlyExpenses = seedExpenses.reduce((sum, entry) => sum + entry.amount, 0);
const donationProgress = seedDonations.reduce((sum, entry) => sum + entry.amount, 0);
const donationTarget = monthlyIncome * (seedGivingSettings.donationPercent / 100);

export const seedDashboardSummary: DashboardSummary = {
  balance: monthlyIncome - monthlyExpenses - donationProgress,
  monthlyIncome,
  monthlyExpenses,
  monthlyDonations: donationProgress,
  donationTarget,
  donationProgress,
  remaining: Math.max(0, donationTarget - donationProgress),
  donationRate: seedGivingSettings.donationPercent,
  savings: monthlyIncome - monthlyExpenses - donationProgress,
  currency: 'PKR',
};

export const financeSeed = {
  userId: SEED_USER_ID,
  userName: 'Ahmed Hassan',
  incomeCategories: seedIncomeCategories,
  expenseCategories: seedExpenseCategories,
  givingSettings: seedGivingSettings,
  recipients: seedRecipients,
  incomes: seedIncomes,
  expenses: seedExpenses,
  donations: seedDonations,
  dashboard: seedDashboardSummary,
};
