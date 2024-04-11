import { baseApi } from './baseApi'

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    tagTypes: ['dashboard'],
    getDashboard: build.query({
      query: (params) => ({ url: '/admin/dashboard', params }),
      providesTags: ['dashboard'],
    }),
    // Add other order-related endpoints as needed...
  }),
  overrideExisting: false,
})

export const { useGetDashboardQuery } = dashboardApi
