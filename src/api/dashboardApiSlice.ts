import { baseApi, mockDelay } from '@/api/baseApi';
import { mockStore } from '@/api/mock/mockStore';
import * as dashboardService from '@/api/supabase/dashboardService';
import { USE_MOCK_FINANCE_API } from '@/config/supabase';
import type { DashboardSummary, UnifiedTransaction } from '@/models/finance.types';

export const dashboardApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<DashboardSummary, void>({
      queryFn: async () => {
        try {
          if (USE_MOCK_FINANCE_API) {
            await mockDelay();
            return { data: mockStore.getDashboardSummary() };
          }
          const data = await dashboardService.getDashboardSummary();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to load dashboard',
            },
          };
        }
      },
      providesTags: [{ type: 'Dashboard', id: 'SUMMARY' }],
    }),
    getTransactions: builder.query<UnifiedTransaction[], void>({
      queryFn: async () => {
        try {
          if (USE_MOCK_FINANCE_API) {
            await mockDelay();
            return { data: mockStore.getTransactions() };
          }
          const data = await dashboardService.getTransactions();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to load transactions',
            },
          };
        }
      },
      providesTags: ['Income', 'Expense', 'Donation'],
    }),
    getUserName: builder.query<string, void>({
      queryFn: async () => {
        try {
          if (USE_MOCK_FINANCE_API) {
            await mockDelay(100);
            return { data: mockStore.getUserName() };
          }
          const data = await dashboardService.getUserName();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to load user name',
            },
          };
        }
      },
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetTransactionsQuery,
  useGetUserNameQuery,
} = dashboardApiSlice;
