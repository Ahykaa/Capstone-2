import { baseApi } from './baseApi'

export const reservationApi = baseApi.injectEndpoints({
  tagTypes: ['reservations'],
  endpoints: (builder) => ({
    getReservation: builder.query({
      providesTags: ['reservations'],
      query: (params) => ({ url: 'reservations', params }),
    }),

    createReservation: builder.mutation({
      invalidatesTags: ['reservations'],
      query: (body) => ({
        url: 'reservations',
        method: 'POST',
        body,
      }),
    }),

    getReservationById: builder.query({
      providesTags: (reservationId) => [
        { type: 'reservations', id: reservationId },
      ],
      query: (reservationId) => ({ url: `/reservations/${reservationId}` }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateReservationMutation,
  useGetReservationQuery,
  useGetReservationByIdQuery,
} = reservationApi
