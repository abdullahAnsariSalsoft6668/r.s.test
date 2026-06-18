import { baseApi, mockDelay } from '@/api/baseApi';
import { mockStore } from '@/api/mock/mockStore';
import * as dashboardService from '@/api/supabase/dashboardService';
import { USE_MOCK_FINANCE_API } from '@/config/supabase';
import type { DashboardSummary, MonthlyTrend } from '@/models/finance.types';

export type AnalyticsResponse = {
  trends: MonthlyTrend[];
  givingScore: number;
  currentMonth: DashboardSummary;
  previousMonth: DashboardSummary;
  givingStreak: number;
  aiInsight: string;
};

export const analyticsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query<AnalyticsResponse, void>({
      queryFn: async () => {
        try {
          if (USE_MOCK_FINANCE_API) {
            await mockDelay();
            return { data: mockStore.getAnalytics() };
          }
          const data = await dashboardService.getAnalytics();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to load analytics',
            },
          };
        }
      },
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticsApiSlice;
