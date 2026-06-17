import { baseApi } from '@/api/baseApi';
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
          const data = await incomeHandlers.getIncomes();
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
          const data = await incomeHandlers.getIncomeCategories();
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
          const data = await incomeHandlers.addIncome(payload);
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
        'Dashboard',
      ],
    }),

    updateIncome: builder.mutation<IncomeEntry, UpdateIncomePayload>({
      queryFn: async (payload) => {
        try {
          const data = await incomeHandlers.updateIncome(payload);
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
        'Dashboard',
      ],
    }),

    deleteIncome: builder.mutation<{ id: string }, string>({
      queryFn: async (id) => {
        try {
          const data = await incomeHandlers.deleteIncome(id);
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
        'Dashboard',
      ],
    }),

    addIncomeCategory: builder.mutation<IncomeCategory, string>({
      queryFn: async (name) => {
        try {
          const data = await incomeHandlers.addIncomeCategory(name);
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
