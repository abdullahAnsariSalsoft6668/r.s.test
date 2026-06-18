import { baseApi, mockDelay } from '@/api/baseApi';
import { mockStore } from '@/api/mock/mockStore';
import * as recipientService from '@/api/supabase/recipientService';
import { USE_MOCK_FINANCE_API } from '@/config/supabase';
import type { Recipient, RelationshipType } from '@/models/finance.types';

export type CreateRecipientPayload = Omit<Recipient, 'id'>;
export type UpdateRecipientPayload = { id: string; data: Partial<Omit<Recipient, 'id'>> };

export const recipientApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecipients: builder.query<Recipient[], void>({
      queryFn: async () => {
        try {
          if (USE_MOCK_FINANCE_API) {
            await mockDelay();
            return { data: mockStore.getRecipients() };
          }
          const data = await recipientService.fetchRecipients();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to load recipients',
            },
          };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Recipient' as const, id })),
              { type: 'Recipient', id: 'LIST' },
            ]
          : [{ type: 'Recipient', id: 'LIST' }],
    }),
    addRecipient: builder.mutation<Recipient, CreateRecipientPayload>({
      queryFn: async (payload) => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? (await mockDelay(), mockStore.addRecipient(payload))
            : await recipientService.createRecipient(payload);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to add recipient',
            },
          };
        }
      },
      invalidatesTags: [{ type: 'Recipient', id: 'LIST' }],
    }),
    updateRecipient: builder.mutation<Recipient, UpdateRecipientPayload>({
      queryFn: async ({ id, data: payload }) => {
        try {
          if (USE_MOCK_FINANCE_API) {
            await mockDelay();
            const data = mockStore.updateRecipient(id, payload);
            return { data };
          }
          const data = await recipientService.updateRecipient(id, payload);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error ? error.message : 'Failed to update recipient',
            },
          };
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Recipient', id },
        { type: 'Recipient', id: 'LIST' },
      ],
    }),
    deleteRecipient: builder.mutation<{ success: true }, string>({
      queryFn: async (id) => {
        try {
          const data = USE_MOCK_FINANCE_API
            ? (await mockDelay(), mockStore.deleteRecipient(id), { success: true as const })
            : await recipientService.deleteRecipient(id);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to delete recipient',
            },
          };
        }
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Recipient', id },
        { type: 'Recipient', id: 'LIST' },
        'Donation',
        'Dashboard',
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRecipientsQuery,
  useAddRecipientMutation,
  useUpdateRecipientMutation,
  useDeleteRecipientMutation,
} = recipientApiSlice;

export const RELATIONSHIP_TYPES: RelationshipType[] = [
  'Relative',
  'Friend',
  'Charity',
  'Neighbour',
  'Other',
];
