import { useUpdateOrderMutation } from '@/hooks/api/orderApi'
import { useOrder } from '@/hooks/redux/useOrders'
import { useRouter } from 'next/router'

const useHooks = (orderId, user) => {
  const router = useRouter()
  const { order, isLoading } = useOrder(orderId)
  const [updateOrderStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderMutation()

  const isApprovable = () => {
    if (user.role === 'headadmin' && order.status.id === 8) {
      return true
    } else if (user.role === 'admin' && order.status.id === 1) {
      return true
    } else if (user.role === 'subadmin1' && order.status.id === 2) {
      return true
    } else if (user.role === 'subadmin2' && order.status.id === 3) {
      return true
    } else if (user.role === 'subadmin' && order.status.id === 4) {
      return true
    } else if (user.role === 'subadmin3' && order.status.id === 5) {
      return true
    } else if (user.role === 'subadmin4' && order.status.id === 6) {
      return true
    } else if (user.role === 'superadmin' && order.status.id === 7) {
      return true
    } else {
      return false
    }
  }

  const getButtonLabel = () => {
    return isUpdatingStatus ? 'Approving...' : 'Approved'
  }

  const handleApprove = async () => {
    try {
      let newStatusId

      switch (user.role) {
        case 'headadmin':
          newStatusId = 9 // Approved
          break
        case 'admin':
          newStatusId = 2 // Approved for Checking
          break
        case 'subadmin1':
          newStatusId = 3 // For Approval by Purchaser
          break
        case 'subadmin2':
          newStatusId = 4 // For Approval by Property Custodian
          break
        case 'subadmin':
          newStatusId = 5 // Pending by GSD
          break
        case 'subadmin3':
          newStatusId = 6 // Pending by Cash Management
          break
        case 'subadmin4':
          newStatusId = 7 // Pending by Director for Admin
          break
        case 'superadmin':
          newStatusId = 8 // Pending by Director for Finance
          break
        default:
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
    isApprovable,
    getButtonLabel,
    handleApprove,
  }
}

export default useHooks
