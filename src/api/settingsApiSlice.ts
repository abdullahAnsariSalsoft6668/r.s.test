import { baseApi, mockDelay } from '@/api/baseApi';
import { mockStore } from '@/api/mock/mockStore';
import * as settingsService from '@/api/supabase/settingsService';
import { USE_MOCK_FINANCE_API } from '@/config/supabase';
import type { GivingSettings } from '@/models/finance.types';

export type UpdateGivingSettingsPayload = Pick<
  GivingSettings,
  'donationPercent' | 'calculationBasis'
>;

export const settingsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGivingSettings: builder.query<GivingSettings, void>({
      queryFn: async () => {
        try {
          if (USE_MOCK_FINANCE_API) {
            await mockDelay();
            return { data: mockStore.getGivingSettings() };
          }
          const data = await settingsService.fetchGivingSettings();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to load settings',
            },
          };
        }
      },
      providesTags: [{ type: 'Settings', id: 'LIST' }],
    }),
    updateGivingSettings: builder.mutation<GivingSettings, UpdateGivingSettingsPayload>({
      queryFn: async (payload) => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? (await mockDelay(), mockStore.updateGivingSettings(payload))
            : await settingsService.updateGivingSettings(payload);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to update settings',
            },
          };
        }
      },
      invalidatesTags: [{ type: 'Settings', id: 'LIST' }, { type: 'Dashboard', id: 'SUMMARY' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetGivingSettingsQuery, useUpdateGivingSettingsMutation } = settingsApiSlice;
