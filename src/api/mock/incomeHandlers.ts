import { mockDelay } from '@/api/baseApi';
import type { IncomeCategory, IncomeEntry } from '@/models/finance.types';

import { mockStore } from './mockStore';

export type AddIncomePayload = Omit<IncomeEntry, 'id'>;
export type UpdateIncomePayload = { id: string } & Partial<Omit<IncomeEntry, 'id'>>;

export const incomeHandlers = {
  async getIncomes(): Promise<IncomeEntry[]> {
    await mockDelay();
    return mockStore.incomes.getAll();
  },

  async getIncomeCategories(): Promise<IncomeCategory[]> {
    await mockDelay();
    return mockStore.incomeCategories.getAll();
  },

  async addIncome(payload: AddIncomePayload): Promise<IncomeEntry> {
    await mockDelay();
    return mockStore.incomes.add(payload);
  },

  async updateIncome({ id, ...patch }: UpdateIncomePayload): Promise<IncomeEntry> {
    await mockDelay();
    const updated = mockStore.incomes.update(id, patch);
    if (!updated) {
      throw new Error('Income entry not found');
    }
    return updated;
  },

  async deleteIncome(id: string): Promise<{ id: string }> {
    await mockDelay();
    const removed = mockStore.incomes.remove(id);
    if (!removed) {
      throw new Error('Income entry not found');
    }
    return { id };
  },

  async addIncomeCategory(name: string): Promise<IncomeCategory> {
    await mockDelay();
    return mockStore.incomeCategories.add(name);
  },
};
