import { baseApi } from './baseApi'

export const orderEntriesApi = baseApi.injectEndpoints({
  tagTypes: ['order_entries'],
  endpoints: (build) => ({
    getOrderEntries: build.query({
      providesTags: ['order_entries'],
      query: (params) => ({ url: `/order_entries`, params }),
    }),

    getOrderEntriesById: build.query({
      providesTags: (result, error, order_id) => [
        { type: 'order_entries', id: order_id },
      ],
      query: (orderId) => ({ url: `/orders/${orderId}` }), // Correct URL construction
    }),
  }),
  overrideExisting: false,
})

export const { useGetOrderEntriesQuery, useGetOrderEntriesByIdQuery } =
  orderEntriesApi
