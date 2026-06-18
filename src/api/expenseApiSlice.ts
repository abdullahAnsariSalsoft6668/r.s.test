import { baseApi, invalidateAfterExpenseWrite } from '@/api/baseApi';
import * as categoryService from '@/api/supabase/categoryService';
import * as expenseService from '@/api/supabase/expenseService';
import { USE_MOCK_FINANCE_API } from '@/config/supabase';
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
          const data = USE_MOCK_FINANCE_API
            ? await expenseHandlers.getExpenses()
            : await expenseService.fetchExpenses();
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
          const data = USE_MOCK_FINANCE_API
            ? await expenseHandlers.getExpenseCategories()
            : await categoryService.fetchExpenseCategories();
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
          const data = USE_MOCK_FINANCE_API
            ? await expenseHandlers.addExpense(payload)
            : await expenseService.createExpense(payload);
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
        ...invalidateAfterExpenseWrite,
      ],
    }),

    updateExpense: builder.mutation<ExpenseEntry, UpdateExpensePayload>({
      queryFn: async ({ id, ...patch }) => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? await expenseHandlers.updateExpense({ id, ...patch })
            : await expenseService.updateExpense(id, patch);
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
        ...invalidateAfterExpenseWrite,
      ],
    }),

    deleteExpense: builder.mutation<{ id: string }, string>({
      queryFn: async (id) => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? await expenseHandlers.deleteExpense(id)
            : await expenseService.deleteExpense(id);
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
        ...invalidateAfterExpenseWrite,
      ],
    }),

    addExpenseCategory: builder.mutation<ExpenseCategory, string>({
      queryFn: async (name) => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? await expenseHandlers.addExpenseCategory(name)
            : await categoryService.createExpenseCategory(name);
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
          const data = USE_MOCK_FINANCE_API
            ? await expenseHandlers.uploadReceipt(uri)
            : await expenseService.uploadReceipt(uri);
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
