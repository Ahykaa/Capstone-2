import { baseApi } from './baseApi'

export const userApi = baseApi.injectEndpoints({
  tagTypes: ['users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      providesTags: ['users'],
      query: (page = 1) => ({ url: `/admin/users?page=${page}` }),
    }),

    createUser: builder.mutation({
      invalidatesTags: ['users'],
      query: (body) => ({
        url: '/admin/users',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetUsersQuery, useCreateUserMutation } = userApi
