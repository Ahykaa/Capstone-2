import { useOrder } from '@/hooks/redux/useOrders'
import { useRouter } from 'next/router'

const useHooks = (orderId) => {
  const router = useRouter()
  const { order, isLoading } = useOrder(orderId)

  const handleDelete = async () => {
    try {
      router.push(`/orders`)
    } catch (error) {
      handleError(error)
    }
  }

  return {
    order,
    isLoading,
    handleDelete,
  }
}

export default useHooks
