import { baseApi } from './baseApi'

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    tagTypes: ['departments'],
    getDepartment: build.query({
      query: () => ({ url: '/departments' }),
      providesTags: ['departments'],
    }),
    // Add other order-related endpoints as needed...
  }),
  overrideExisting: false,
})

export const { useGetDepartmentQuery } = departmentApi
