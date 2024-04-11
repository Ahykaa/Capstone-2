import { baseApi } from './baseApi'

export const orderApi = baseApi.injectEndpoints({
  tagTypes: ['orders'],
  endpoints: (build) => ({
    getOrders: build.query({
      providesTags: ['orders'],
      query: (params) => ({ url: `/orders`, params }),
    }),

    createOrder: build.mutation({
      invalidatesTags: ['orders'],
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
    }),
    updateOrder: build.mutation({
      invalidatesTags: ['orders'],
      query: ({ orderId, ...body }) => ({
        url: `orders/${orderId}`,
        method: 'PUT',
        body,
      }),
    }),
    getOrderById: build.query({
      providesTags: (orderId) => [{ type: 'orders', id: orderId }],
      query: (orderId) => ({ url: `/orders/${orderId}` }),
    }),
    deleteOrder: build.mutation({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi
