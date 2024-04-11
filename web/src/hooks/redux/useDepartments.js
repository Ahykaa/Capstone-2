import { useMemo } from 'react'

import { departmentApi } from '../api/departmentApi'

export const useDepartments = () => {
  const { data, isError, isLoading } = departmentApi.useGetDepartmentQuery()

  const departments = useMemo(() => data?.departments || [], [data])

  return {
    departments,
    isError,
    isLoading,
  }
}
