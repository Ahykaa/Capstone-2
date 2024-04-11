import { useMemo } from 'react'

import { statusApi } from '../api/statusApi'

export const useStatus = () => {
  const { data, isError, isLoading } = statusApi.useGetStatusQuery()

  const statuses = useMemo(() => data?.statuses || [], [data])

  return {
    statuses,
    isError,
    isLoading,
  }
}
