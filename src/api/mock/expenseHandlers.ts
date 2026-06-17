import { mockDelay } from '@/api/baseApi';
import type { ExpenseCategory, ExpenseEntry } from '@/models/finance.types';

import { mockStore } from './mockStore';

export type AddExpensePayload = Omit<ExpenseEntry, 'id'>;
export type UpdateExpensePayload = { id: string } & Partial<Omit<ExpenseEntry, 'id'>>;

export const expenseHandlers = {
  async getExpenses(): Promise<ExpenseEntry[]> {
    await mockDelay();
    return mockStore.expenses.getAll();
  },

  async getExpenseCategories(): Promise<ExpenseCategory[]> {
    await mockDelay();
    return mockStore.expenseCategories.getAll();
  },

  async addExpense(payload: AddExpensePayload): Promise<ExpenseEntry> {
    await mockDelay();
    return mockStore.expenses.add(payload);
  },

  async updateExpense({ id, ...patch }: UpdateExpensePayload): Promise<ExpenseEntry> {
    await mockDelay();
    const updated = mockStore.expenses.update(id, patch);
    if (!updated) {
      throw new Error('Expense entry not found');
    }
    return updated;
  },

  async deleteExpense(id: string): Promise<{ id: string }> {
    await mockDelay();
    const removed = mockStore.expenses.remove(id);
    if (!removed) {
      throw new Error('Expense entry not found');
    }
    return { id };
  },

  async addExpenseCategory(name: string): Promise<ExpenseCategory> {
    await mockDelay();
    return mockStore.expenseCategories.add(name);
  },

  /** Alpha: returns the local file URI without uploading to a server. */
  async uploadReceipt(uri: string): Promise<{ receiptUri: string }> {
    await mockDelay(150);
    if (!uri?.trim()) {
      throw new Error('Receipt URI is required');
    }
    return { receiptUri: uri };
  },
};
