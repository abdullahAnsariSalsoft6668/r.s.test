import { baseApi, mockDelay } from '@/api/baseApi';
import { mockStore } from '@/api/mock/mockStore';
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
        await mockDelay();
        return { data: mockStore.getAnalytics() };
      },
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticsApiSlice;
