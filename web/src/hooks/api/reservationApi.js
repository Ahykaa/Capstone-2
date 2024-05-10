import { baseApi } from './baseApi'

export const reservationApi = baseApi.injectEndpoints({
  tagTypes: ['reservations'],
  endpoints: (builder) => ({
    getReservation: builder.query({
      providesTags: ['reservations'],
      query: (params) => ({ url: `reservations`, params }),
    }),

    createReservation: builder.mutation({
      invalidatesTags: ['reservations'],
      query: (body) => ({
        url: 'reservations',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCreateReservationMutation, useGetReservationQuery } =
  reservationApi
