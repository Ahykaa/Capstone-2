import { baseApi } from './baseApi'

export const unitApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    tagTypes: ['units'],
    getUnit: build.query({
      query: () => ({ url: '/units' }),
      providesTags: ['units'],
    }),
    // Add other order-related endpoints as needed...
  }),
  overrideExisting: false,
})

export const { useGetUnitQuery } = unitApi
