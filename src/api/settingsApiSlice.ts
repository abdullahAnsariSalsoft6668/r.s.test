import { baseApi, mockDelay } from '@/api/baseApi';
import { mockStore } from '@/api/mock/mockStore';
import type { GivingSettings } from '@/models/finance.types';

export type UpdateGivingSettingsPayload = Pick<
  GivingSettings,
  'donationPercent' | 'calculationBasis'
>;

export const settingsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGivingSettings: builder.query<GivingSettings, void>({
      queryFn: async () => {
        await mockDelay();
        return { data: mockStore.getGivingSettings() };
      },
      providesTags: [{ type: 'Settings', id: 'LIST' }],
    }),
    updateGivingSettings: builder.mutation<GivingSettings, UpdateGivingSettingsPayload>({
      queryFn: async (payload) => {
        await mockDelay();
        const data = mockStore.updateGivingSettings(payload);
        return { data };
      },
      invalidatesTags: [{ type: 'Settings', id: 'LIST' }, { type: 'Dashboard', id: 'SUMMARY' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetGivingSettingsQuery, useUpdateGivingSettingsMutation } = settingsApiSlice;
