import { useUpdateOrderMutation } from '@/hooks/api/orderApi'
import { useOrder } from '@/hooks/redux/useOrders'
import { useRouter } from 'next/router'

const useHooks = (orderId, user) => {
  const router = useRouter()
  const { order, isLoading } = useOrder(orderId)
  const [updateOrderStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderMutation()

  const getButtonLabel = () => {
    if (user.role === 'headadmin')
      return isUpdatingStatus ? 'Approving...' : 'Approved'
    if (
      user.role === 'admin' ||
      user.role === 'subadmin1' ||
      user.role === 'subadmin2' ||
      user.role === 'subadmin' ||
      user.role === 'subadmin3' ||
      user.role === 'subadmin4' ||
      user.role === 'superadmin' ||
      user.role === 'headadmin'
    )
      return isUpdatingStatus ? 'Approving...' : 'Approved'
  }

  const handleApprove = async () => {
    try {
      let newStatusId

      if (order.status.id === 8 && user.role === 'headadmin') {
        newStatusId = 9 // Approved
      } else if (order.status.id === 1 && user.role === 'admin') {
        newStatusId = 2 // Approved for Checking
      } else if (order.status.id === 2 && user.role === 'subadmin1') {
        newStatusId = 3 // For Approval by Purchaser
      } else if (order.status.id === 3 && user.role === 'subadmin2') {
        newStatusId = 4 // For Approval by Property Custodian
      } else if (order.status.id === 4 && user.role === 'subadmin') {
        newStatusId = 5 // Pending by GSD
      } else if (order.status.id === 5 && user.role === 'subadmin3') {
        newStatusId = 6 // Pending by Cash Management
      } else if (order.status.id === 6 && user.role === 'subadmin4') {
        newStatusId = 7 // Pending by Director for Admin
      } else if (order.status.id === 7 && user.role === 'superadmin') {
        newStatusId = 8 // Pending by Director for Finance
      } else {
        return
      }

      const updatedOrder = await updateOrderStatus({
        orderId,
        statusId: newStatusId,
      })

      router.reload()
      router.push(`/orders/${orderId}`)

      return updatedOrder // Return the updated order
    } catch (error) {
      handleError(error)
    }
  }

  return {
    order,
    isLoading,
    getButtonLabel,
    handleApprove,
  }
}

export default useHooks
