import { baseApi } from './baseApi'

export const statusApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStatus: build.query({
      query: () => ({ url: '/statuses' }),
      providesTags: ['statuses'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetStatusQuery } = statusApi
