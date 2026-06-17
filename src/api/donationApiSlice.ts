import { baseApi, mockDelay } from '@/api/baseApi';
import { mockStore } from '@/api/mock/mockStore';
import type { DonationEntry } from '@/models/finance.types';

export type CreateDonationPayload = Omit<DonationEntry, 'id'>;
export type UpdateDonationPayload = { id: string; data: Partial<Omit<DonationEntry, 'id'>> };

export const donationApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDonations: builder.query<DonationEntry[], void>({
      queryFn: async () => {
        await mockDelay();
        return { data: mockStore.getDonations() };
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
        await mockDelay();
        const data = mockStore.addDonation(payload);
        return { data };
      },
      invalidatesTags: [{ type: 'Donation', id: 'LIST' }, { type: 'Dashboard', id: 'SUMMARY' }],
    }),
    updateDonation: builder.mutation<DonationEntry, UpdateDonationPayload>({
      queryFn: async ({ id, data: payload }) => {
        await mockDelay();
        try {
          const data = mockStore.updateDonation(id, payload);
          return { data };
        } catch {
          return { error: { status: 404, data: 'Donation not found' } };
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Donation', id },
        { type: 'Donation', id: 'LIST' },
        { type: 'Dashboard', id: 'SUMMARY' },
      ],
    }),
    deleteDonation: builder.mutation<{ success: true }, string>({
      queryFn: async (id) => {
        await mockDelay();
        mockStore.deleteDonation(id);
        return { data: { success: true } };
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Donation', id },
        { type: 'Donation', id: 'LIST' },
        { type: 'Dashboard', id: 'SUMMARY' },
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
