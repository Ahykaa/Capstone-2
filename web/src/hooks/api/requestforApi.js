import { baseApi } from './baseApi'

export const requestforApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    tagTypes: ['requestFor'],
    getRequestFor: build.query({
      query: () => ({ url: '/requestFor' }),
      providesTags: ['requestFor'],
    }),
    // Add other order-related endpoints as needed...
  }),
  overrideExisting: false,
})

export const { useGetRequestForQuery } = requestforApi
