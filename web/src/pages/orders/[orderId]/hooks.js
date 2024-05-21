import { useUpdateOrderMutation } from '@/hooks/api/orderApi'
import { useOrderEntries } from '@/hooks/redux/useOrderEntries'
import { useOrder } from '@/hooks/redux/useOrders'
import { useRouter } from 'next/router'

const useHooks = (orderId, user) => {
  const router = useRouter()
  const { order } = useOrder(orderId)
  const { order_entries } = useOrderEntries(orderId)

  const [updateOrderStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderMutation()

  const isApprovable = () => {
    if (!order || !order.status) return false
    const approvableStatuses = {
      headadmin: 8,
      admin: 1,
      subadmin1: 2,
      subadmin2: 3,
      subadmin: 4,
      subadmin3: 5,
      subadmin4: 6,
      superadmin: 7,
    }
    return (
      user.role in approvableStatuses &&
      order.status.id === approvableStatuses[user.role]
    )
  }

  const getButtonLabel = () => {
    return isUpdatingStatus ? 'Approving...' : 'Approve'
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

      await updateOrderStatus({
        orderId,
        statusId: newStatusId,
      })

      router.push(`/orders/${order.id}`)
    } catch (error) {
      handleError(error)
    }
  }

  return {
    order,
    order_entries,
    isApprovable,
    getButtonLabel,
    handleApprove,
  }
}

export default useHooks
