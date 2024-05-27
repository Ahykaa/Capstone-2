import { baseApi } from './baseApi'

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    tagTypes: ['departments'],
    getDepartment: build.query({
      query: () => ({ url: '/departments' }),
      providesTags: ['departments'],
    }),
    updateDepartment: build.mutation({
      invalidatesTags: ['departments'],
      query: ({ departmentId, budget }) => ({
        url: `/departments/${departmentId}`,
        method: 'PUT',
        body: { budget },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetDepartmentQuery, useUpdateDepartmentMutation } =
  departmentApi
