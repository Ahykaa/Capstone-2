import { useUpdateOrderMutation } from '@/hooks/api/orderApi'
import { useOrder } from '@/hooks/redux/useOrders'
import { useRouter } from 'next/router'

const useHooks = (orderId, user) => {
  const router = useRouter()
  const { order, isLoading } = useOrder(orderId)
  const [updateOrderStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderMutation()

  const getButtonLabel = () => {
    if (user.role === 'superadmin')
      return isUpdatingStatus ? 'Approving...' : 'Approved'
    if (user.role === 'admin')
      return isUpdatingStatus ? 'Approving...' : 'Approved for Checking'
    return isUpdatingStatus ? 'Approving...' : 'For Approval'
  }
  const handleError = (error) => {
    console.error('An error occurred:', error)
  }

  const handleApprove = async () => {
    try {
      let newStatusId

      if (order.status.id === 2 && user.role === 'superadmin') {
        newStatusId = 5 // Approved
      } else if (order.status.id === 1 && user.role === 'admin') {
        newStatusId = 2 // Approved for Checking
      } else {
        return
      }

      await updateOrderStatus({ orderId, statusId: newStatusId })

      router.reload()
      router.push(`/orders/${orderId}`)
    } catch (error) {
      handleError(error)
    }
  }

  return {
    order,
    isLoading,
    getButtonLabel,
    handleApprove,
    isUpdatingStatus,
  }
}

export default useHooks
