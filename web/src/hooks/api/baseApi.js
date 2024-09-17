import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '../lib/tokenStorage'

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: [
    'Auth',
    'department',
    'unit',
    'dashboard',
    'orders',
    'status',
    'users',
    'requestFor',
    'reservations',
    'order_entries',
    'reservation_entries',
  ],
  overrideExisting: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://seagreen-turkey-199518.hostingersite.com/api',
    prepareHeaders: (headers) => {
      const token = getToken()
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      headers.set('Accept', 'application/json')
      return headers
    },
    validateStatus(response) {
      if (response.status >= 200 && response.status <= 299) return true
      if (response.status === 401) {
        // TODO: Logout function
        // logoutUser('/login')
      }
      if (response.status === 503) {
        location.href = '/maintenance'
      }
      return false
    },
    overrideExisting: true,
  }),
  endpoints: () => ({}),
})
