import { baseApi, invalidateAfterDonationWrite, mockDelay } from '@/api/baseApi';
import { mockStore } from '@/api/mock/mockStore';
import * as donationService from '@/api/supabase/donationService';
import { USE_MOCK_FINANCE_API } from '@/config/supabase';
import type { DonationEntry } from '@/models/finance.types';

export type CreateDonationPayload = Omit<DonationEntry, 'id'>;
export type UpdateDonationPayload = { id: string; data: Partial<Omit<DonationEntry, 'id'>> };

export const donationApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDonations: builder.query<DonationEntry[], void>({
      queryFn: async () => {
        try {
          if (USE_MOCK_FINANCE_API) {
            await mockDelay();
            return { data: mockStore.getDonations() };
          }
          const data = await donationService.fetchDonations();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to load donations',
            },
          };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Donation' as const, id })),
              { type: 'Donation', id: 'LIST' },
            ]
          : [{ type: 'Donation', id: 'LIST' }],
    }),
    addDonation: builder.mutation<DonationEntry, CreateDonationPayload>({
      queryFn: async (payload) => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? (await mockDelay(), mockStore.addDonation(payload))
            : await donationService.createDonation(payload);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to add donation',
            },
          };
        }
      },
      invalidatesTags: [{ type: 'Donation', id: 'LIST' }, ...invalidateAfterDonationWrite],
    }),
    updateDonation: builder.mutation<DonationEntry, UpdateDonationPayload>({
      queryFn: async ({ id, data: payload }) => {
        try {
          if (USE_MOCK_FINANCE_API) {
            await mockDelay();
            const data = mockStore.updateDonation(id, payload);
            return { data };
          }
          const data = await donationService.updateDonation(id, payload);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error ? error.message : 'Failed to update donation',
            },
          };
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Donation', id },
        { type: 'Donation', id: 'LIST' },
        ...invalidateAfterDonationWrite,
      ],
    }),
    deleteDonation: builder.mutation<{ success: true }, string>({
      queryFn: async (id) => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? (await mockDelay(), mockStore.deleteDonation(id), { success: true as const })
            : await donationService.deleteDonation(id);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to delete donation',
            },
          };
        }
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Donation', id },
        { type: 'Donation', id: 'LIST' },
        ...invalidateAfterDonationWrite,
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDonationsQuery,
  useAddDonationMutation,
  useUpdateDonationMutation,
  useDeleteDonationMutation,
} = donationApiSlice;

export { RELATIONSHIP_TYPES as DONATION_TYPES } from '@/api/recipientApiSlice';
