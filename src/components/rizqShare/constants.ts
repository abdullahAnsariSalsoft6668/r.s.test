import type { FinancialSummary, Transaction } from './types';

export const MOCK_USER = {
    firstName: 'Ahmed',
    fullName: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
};

export const MOCK_SUMMARY: FinancialSummary = {
    totalBalance: 44000,
    totalIncome: 125000,
    totalExpenses: 81000,
    totalDonations: 12500,
    donationRate: 10,
    donationGoal: 12500,
    donationProgress: 10,
    monthlyDonation: 12500,
    yearlyDonation: 65000,
    yearlyGoal: 125000,
    givingScore: 85,
    givingStreak: 12,
};

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: '1', title: 'Salary', amount: 85000, type: 'income', date: 'May 1, 2024', category: 'Employment' },
    { id: '2', title: 'Freelance Work', amount: 40000, type: 'income', date: 'May 10, 2024', category: 'Freelance' },
    { id: '3', title: 'Grocery Shopping', amount: -2450, type: 'expense', date: 'May 12, 2024', category: 'Food' },
    { id: '4', title: 'Electricity Bill', amount: -3200, type: 'expense', date: 'May 14, 2024', category: 'Utilities' },
    { id: '5', title: 'Charity Donation', amount: -5000, type: 'donation', date: 'May 15, 2024', category: 'Zakat' },
    { id: '6', title: 'Transport', amount: -1800, type: 'expense', date: 'May 18, 2024', category: 'Travel' },
    { id: '7', title: 'Mosque Fund', amount: -7500, type: 'donation', date: 'May 20, 2024', category: 'Sadaqah' },
];

export const QURAN_QUOTE =
    'The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes; in each spike is a hundred grains. And Allah multiplies for whom He wills. (Quran 2:261)';

export const formatCurrency = (amount: number): string => {
    const abs = Math.abs(amount);
    return `₹${abs.toLocaleString('en-IN')}`;
};
