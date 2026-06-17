import { baseApi, mockDelay } from '@/api/baseApi';
import { mockStore } from '@/api/mock/mockStore';
import type { Recipient, RelationshipType } from '@/models/finance.types';

export type CreateRecipientPayload = Omit<Recipient, 'id'>;
export type UpdateRecipientPayload = { id: string; data: Partial<Omit<Recipient, 'id'>> };

export const recipientApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecipients: builder.query<Recipient[], void>({
      queryFn: async () => {
        await mockDelay();
        return { data: mockStore.getRecipients() };
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
        await mockDelay();
        const data = mockStore.addRecipient(payload);
        return { data };
      },
      invalidatesTags: [{ type: 'Recipient', id: 'LIST' }],
    }),
    updateRecipient: builder.mutation<Recipient, UpdateRecipientPayload>({
      queryFn: async ({ id, data: payload }) => {
        await mockDelay();
        try {
          const data = mockStore.updateRecipient(id, payload);
          return { data };
        } catch {
          return { error: { status: 404, data: 'Recipient not found' } };
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Recipient', id },
        { type: 'Recipient', id: 'LIST' },
      ],
    }),
    deleteRecipient: builder.mutation<{ success: true }, string>({
      queryFn: async (id) => {
        await mockDelay();
        mockStore.deleteRecipient(id);
        return { data: { success: true } };
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
