import { useMemo } from 'react'

import { userApi } from '../api/userApi'

export const useUsers = (page) => {
  const { data, isError, isLoading } = userApi.useGetUsersQuery(page)

  const users = useMemo(() => data?.users.data || [], [data])
  const totalPages = useMemo(() => data?.users.last_page || 1, [data])
  return {
    users,
    totalPages,
    isError,
    isLoading,
  }
}
