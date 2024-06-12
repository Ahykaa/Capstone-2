import { baseApi } from './baseApi'

export const reservationEntriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReservationEntries: build.query({
      providesTags: (result, error, params) => [
        { type: 'reservation_entries', params },
      ],
      queryFn: (params) => ({ url: `/reservation_entries`, params }),
    }),

    getReservationEntriesById: build.query({
      // Ensure the endpoint name is correctly used
      providesTags: (result, error, reservationId) => [
        { type: 'reservation_entries', id: reservationId },
      ],
      query: (reservationId) => ({ url: `/reservations/${reservationId}` }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetReservationEntriesQuery,
  useGetReservationEntriesByIdQuery,
} = reservationEntriesApi
