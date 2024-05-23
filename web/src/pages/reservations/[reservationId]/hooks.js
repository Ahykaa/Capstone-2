import { useReservation } from '@/hooks/redux/useReservation'
import { useRouter } from 'next/router'

const useHooks = (reservationId) => {
  const router = useRouter()
  const { reservation, isLoading } = useReservation(reservationId)

  return {
    reservation,
    isLoading,
    router,
  }
}

export default useHooks
