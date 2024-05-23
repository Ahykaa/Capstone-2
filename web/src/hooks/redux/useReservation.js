import { useMemo } from 'react'

import { reservationApi } from '../api/reservationApi'

export const useReservations = (params) => {
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

export const useReservation = (reservationId) => {
  const { data, error, isError, isLoading } =
    reservationApi.useGetReservationByIdQuery(reservationId)

  const reservation = useMemo(() => data?.reservation || null, [data])

  return {
    reservation,
    error,
    isError,
    isLoading,
  }
}
