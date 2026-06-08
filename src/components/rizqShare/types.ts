export type TransactionType = 'income' | 'expense' | 'donation';

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: TransactionType;
    date: string;
    category: string;
}

export interface FinancialSummary {
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
    totalDonations: number;
    donationRate: number;
    donationGoal: number;
    donationProgress: number;
    monthlyDonation: number;
    yearlyDonation: number;
    yearlyGoal: number;
    givingScore: number;
    givingStreak: number;
}
