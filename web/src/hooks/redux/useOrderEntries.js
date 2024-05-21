import { useMemo } from 'react'
import { useGetOrderEntriesByIdQuery } from '@/hooks/api/orderEntriesApi'

export const useOrderEntries = (order_id) => {
  const { data, error, isError, isLoading } =
    useGetOrderEntriesByIdQuery(order_id)

  const order_entries = useMemo(() => data?.order?.order_entries || [], [data])

  return {
    order_entries,
    error,
    isError,
    isLoading,
  }
}
