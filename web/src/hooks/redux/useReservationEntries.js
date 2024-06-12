import { useMemo } from 'react'
import { useGetReservationEntriesByIdQuery } from '@/hooks/api/reservationEntriesApi'

export const useReservationEntries = (reservationId) => {
  const { data, error, isError, isLoading } =
    useGetReservationEntriesByIdQuery(reservationId)

  const reservation_entries = useMemo(
    () => data?.reservation?.reservation_entries || [],
    [data],
  )

  return {
    reservation_entries,
    error,
    isError,
    isLoading,
  }
}
