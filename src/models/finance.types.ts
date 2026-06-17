export type CalculationBasis = 'all_income';

export type AppCurrency = import('@/constants/currency').AppCurrency;

export type DonationType = 'Relative' | 'Friend' | 'Charity' | 'Neighbour' | 'Other';

export type RelationshipType = DonationType;

export type TransactionType = 'income' | 'expense' | 'donation';

export interface IncomeCategory {
  id: string;
  name: string;
  isDefault?: boolean;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  isDefault?: boolean;
}

export interface IncomeEntry {
  id: string;
  amount: number;
  categoryId: string;
  date: string;
  note?: string;
  recurring: boolean;
  currency?: AppCurrency;
}

export interface ExpenseEntry {
  id: string;
  amount: number;
  categoryId: string;
  date: string;
  note?: string;
  receiptUri?: string;
  currency?: AppCurrency;
}

export interface Recipient {
  id: string;
  name: string;
  relationshipType: RelationshipType;
  phone?: string;
  note?: string;
}

export interface DonationEntry {
  id: string;
  amount: number;
  recipientId: string;
  type: DonationType;
  date: string;
  note?: string;
  currency?: AppCurrency;
}

export interface GivingSettings {
  userId: string;
  donationPercent: number;
  calculationBasis: CalculationBasis;
}

export interface DashboardSummary {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyDonations: number;
  donationTarget: number;
  donationProgress: number;
  remaining: number;
  donationRate: number;
  savings: number;
  currency: AppCurrency;
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expenses: number;
  donations: number;
  savings: number;
}

export interface UnifiedTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  label: string;
  categoryOrRecipient?: string;
}
