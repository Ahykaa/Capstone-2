import { useMemo } from 'react'

import { reservationApi } from '../api/reservationApi'

export const useReservation = (params) => {
  const { data, error, isError, isLoading } =
    reservationApi.useGetReservationQuery(params)

  const reservations = useMemo(() => data?.reservations || [], [data])

  return {
    reservations,
    error,
    isError,
    isLoading,
  }
}
