import { baseApi } from './baseApi'

export const statusApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    tagTypes: ['statuses'],
    getDepartment: build.query({
      query: () => ({ url: '/statuses' }),
      providesTags: ['statuses'],
    }),
    // Add other order-related endpoints as needed...
  }),
  overrideExisting: false,
})

export const { useGetStatusQuery } = statusApi
