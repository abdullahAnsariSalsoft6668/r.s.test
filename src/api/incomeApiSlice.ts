import { baseApi, invalidateAfterIncomeWrite } from '@/api/baseApi';
import * as categoryService from '@/api/supabase/categoryService';
import * as incomeService from '@/api/supabase/incomeService';
import { USE_MOCK_FINANCE_API } from '@/config/supabase';
import type { IncomeCategory, IncomeEntry } from '@/models/finance.types';

import {
  incomeHandlers,
  type AddIncomePayload,
  type UpdateIncomePayload,
} from './mock/incomeHandlers';

export const incomeApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIncomes: builder.query<IncomeEntry[], void>({
      queryFn: async () => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? await incomeHandlers.getIncomes()
            : await incomeService.fetchIncomes();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to load incomes',
            },
          };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Income' as const, id })),
              { type: 'Income', id: 'LIST' },
            ]
          : [{ type: 'Income', id: 'LIST' }],
    }),

    getIncomeCategories: builder.query<IncomeCategory[], void>({
      queryFn: async () => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? await incomeHandlers.getIncomeCategories()
            : await categoryService.fetchIncomeCategories();
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
      providesTags: [{ type: 'Income', id: 'CATEGORIES' }],
    }),

    addIncome: builder.mutation<IncomeEntry, AddIncomePayload>({
      queryFn: async (payload) => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? await incomeHandlers.addIncome(payload)
            : await incomeService.createIncome(payload);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to add income',
            },
          };
        }
      },
      invalidatesTags: [
        { type: 'Income', id: 'LIST' },
        ...invalidateAfterIncomeWrite,
      ],
    }),

    updateIncome: builder.mutation<IncomeEntry, UpdateIncomePayload>({
      queryFn: async ({ id, ...patch }) => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? await incomeHandlers.updateIncome({ id, ...patch })
            : await incomeService.updateIncome(id, patch);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to update income',
            },
          };
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Income', id },
        { type: 'Income', id: 'LIST' },
        ...invalidateAfterIncomeWrite,
      ],
    }),

    deleteIncome: builder.mutation<{ id: string }, string>({
      queryFn: async (id) => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? await incomeHandlers.deleteIncome(id)
            : await incomeService.deleteIncome(id);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to delete income',
            },
          };
        }
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Income', id },
        { type: 'Income', id: 'LIST' },
        ...invalidateAfterIncomeWrite,
      ],
    }),

    addIncomeCategory: builder.mutation<IncomeCategory, string>({
      queryFn: async (name) => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? await incomeHandlers.addIncomeCategory(name)
            : await categoryService.createIncomeCategory(name);
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
      invalidatesTags: [{ type: 'Income', id: 'CATEGORIES' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetIncomesQuery,
  useGetIncomeCategoriesQuery,
  useAddIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
  useAddIncomeCategoryMutation,
} = incomeApiSlice;
