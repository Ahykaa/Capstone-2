import { useMemo } from 'react'

import { unitApi } from '../api/unitApi'

export const useUnits = () => {
  const { data, isError, isLoading } = unitApi.useGetUnitQuery()

  const units = useMemo(() => data?.units || [], [data])

  return {
    units,
    isError,
    isLoading,
  }
}
