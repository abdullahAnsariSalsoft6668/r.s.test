import { baseApi, mockDelay } from '@/api/baseApi';
import { mockStore } from '@/api/mock/mockStore';
import type { DashboardSummary, UnifiedTransaction } from '@/models/finance.types';

export const dashboardApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<DashboardSummary, void>({
      queryFn: async () => {
        await mockDelay();
        return { data: mockStore.getDashboardSummary() };
      },
      providesTags: [{ type: 'Dashboard', id: 'SUMMARY' }],
    }),
    getTransactions: builder.query<UnifiedTransaction[], void>({
      queryFn: async () => {
        await mockDelay();
        return { data: mockStore.getTransactions() };
      },
      providesTags: ['Income', 'Expense', 'Donation'],
    }),
    getUserName: builder.query<string, void>({
      queryFn: async () => {
        await mockDelay(100);
        return { data: mockStore.getUserName() };
      },
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetTransactionsQuery,
  useGetUserNameQuery,
} = dashboardApiSlice;
