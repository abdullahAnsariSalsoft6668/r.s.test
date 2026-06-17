import { baseApi } from '@/api/baseApi';
import type { ExpenseCategory, ExpenseEntry } from '@/models/finance.types';

import {
  expenseHandlers,
  type AddExpensePayload,
  type UpdateExpensePayload,
} from './mock/expenseHandlers';

export const expenseApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query<ExpenseEntry[], void>({
      queryFn: async () => {
        try {
          const data = await expenseHandlers.getExpenses();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to load expenses',
            },
          };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Expense' as const, id })),
              { type: 'Expense', id: 'LIST' },
            ]
          : [{ type: 'Expense', id: 'LIST' }],
    }),

    getExpenseCategories: builder.query<ExpenseCategory[], void>({
      queryFn: async () => {
        try {
          const data = await expenseHandlers.getExpenseCategories();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to load categories',
            },
          };
        }
      },
      providesTags: [{ type: 'Expense', id: 'CATEGORIES' }],
    }),

    addExpense: builder.mutation<ExpenseEntry, AddExpensePayload>({
      queryFn: async (payload) => {
        try {
          const data = await expenseHandlers.addExpense(payload);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to add expense',
            },
          };
        }
      },
      invalidatesTags: [
        { type: 'Expense', id: 'LIST' },
        'Dashboard',
      ],
    }),

    updateExpense: builder.mutation<ExpenseEntry, UpdateExpensePayload>({
      queryFn: async (payload) => {
        try {
          const data = await expenseHandlers.updateExpense(payload);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to update expense',
            },
          };
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Expense', id },
        { type: 'Expense', id: 'LIST' },
        'Dashboard',
      ],
    }),

    deleteExpense: builder.mutation<{ id: string }, string>({
      queryFn: async (id) => {
        try {
          const data = await expenseHandlers.deleteExpense(id);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to delete expense',
            },
          };
        }
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Expense', id },
        { type: 'Expense', id: 'LIST' },
        'Dashboard',
      ],
    }),

    addExpenseCategory: builder.mutation<ExpenseCategory, string>({
      queryFn: async (name) => {
        try {
          const data = await expenseHandlers.addExpenseCategory(name);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to add category',
            },
          };
        }
      },
      invalidatesTags: [{ type: 'Expense', id: 'CATEGORIES' }],
    }),

    uploadReceipt: builder.mutation<{ receiptUri: string }, string>({
      queryFn: async (uri) => {
        try {
          const data = await expenseHandlers.uploadReceipt(uri);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to attach receipt',
            },
          };
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetExpensesQuery,
  useGetExpenseCategoriesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useAddExpenseCategoryMutation,
  useUploadReceiptMutation,
} = expenseApiSlice;
