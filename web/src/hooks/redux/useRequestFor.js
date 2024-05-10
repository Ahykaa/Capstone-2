import { useMemo } from 'react'

import { requestforApi } from '../api/requestforApi'

export const useRequestFor = () => {
  const { data, isError, isLoading } = requestforApi.useGetRequestForQuery()

  const requestFor = useMemo(() => data?.requestFor || [], [data])
  return {
    requestFor,
    isError,
    isLoading,
  }
}
