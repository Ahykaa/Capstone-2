import { useReservation } from '@/hooks/redux/useReservation'
import { useReservationEntries } from '@/hooks/redux/useReservationEntries'
import { useRouter } from 'next/router'

const useHooks = (reservationId) => {
  const router = useRouter()
  const { reservation, isLoading } = useReservation(reservationId)
  const { reservation_entries } = useReservationEntries(reservationId)

  return {
    reservation_entries,
    reservation,
    isLoading,
    router,
  }
}

export default useHooks
