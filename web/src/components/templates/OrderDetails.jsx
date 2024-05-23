import dayjs from 'dayjs'
import RowItem from '../organisms/RowItem'
import {
  FaCalendarAlt,
  FaUser,
  FaLayerGroup,
  FaCheckSquare,
  FaBars,
} from 'react-icons/fa'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import useHooks from '@/pages/orders/[orderId]/hooks'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/redux/auth'
import { useRequestFor } from '@/hooks/redux/useRequestFor'
import { useUnits } from '@/hooks/redux/useUnits'
import { capitalizeFirstLetter } from '@/hooks/lib/util'

const OrderDetails = () => {
  const router = useRouter()
  const { user } = useUser()
  const { orderId } = router.query

  const { order, order_entries } = useHooks(orderId, user)

  const { requestFor } = useRequestFor()
  const { units } = useUnits()

  const requestForLabel =
    requestFor.find((rf) => rf.id === order.request_fors_id)?.label || 'Unknown'

  if (!order || !order_entries || !units) return <div>Loading...</div>

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex space-x-4 w-full'>
        <div className='w-full'>
          <RowItem
            label='Date Prepared'
            value={dayjs(order.order_at).format('MMM DD, YYYY')}
            icon={<FaCalendarAlt />}
          />
        </div>
        <div className='w-full'>
          <RowItem
            label='Date Needed'
            value={dayjs(order.date_needed).format('MMM DD, YYYY')}
            icon={<FaCalendarAlt />}
          />
        </div>
        <div className='w-full'>
          <RowItem
            label='Status'
            value={order.status?.label}
            icon={<HiOutlineInformationCircle />}
          />
        </div>
      </div>
      <div className='flex space-x-4 w-full'>
        <div className='w-full'>
          <RowItem label='From' value={order.from} icon={<FaUser />} />
        </div>
        <div className='w-full'>
          <RowItem
            label='Department'
            value={order.department?.label}
            icon={<FaLayerGroup />}
          />
        </div>
      </div>
      <div className='flex space-x-4 w-full'>
        <div className='w-full'>
          <RowItem
            label='Request For'
            value={requestForLabel}
            icon={<FaCheckSquare />}
          />
        </div>
        <div className='w-full'>
          <RowItem
            label='Specify if others'
            value={order.notes}
            icon={<FaBars />}
          />
        </div>
      </div>

      <div>
        <h3>Order Entries</h3>
        {order_entries && order_entries.length > 0 ?
          order_entries.map((entry, index) => {
            const unitLabel =
              units.find((u) => u.id === entry.unit_id)?.label || 'Unknown'

            return (
              <div key={index} className='shadow-lg p-4 rounded-lg space-y-4'>
                <div className='flex space-x-4'>
                  <div className='w-1/6'>
                    <RowItem label='Quantity' value={entry.quantity} />
                  </div>
                  <div className='w-1/6'>
                    <RowItem
                      label='Unit'
                      value={capitalizeFirstLetter(unitLabel)}
                    />
                  </div>
                  <div className='w-2/6'>
                    <RowItem label='Description' value={entry.description} />
                  </div>
                  <div className='w-1/6'>
                    <RowItem label='Unit Cost' value={entry.uniCost} />
                  </div>
                  <div className='w-1/6'>
                    <RowItem label='Amount' value={entry.amount} />
                  </div>
                </div>
                <div className='w-full mt-4'>
                  <RowItem label='Remarks' value={entry.remarks} />
                </div>
              </div>
            )
          })
        : <p>No order entries available</p>}
      </div>
    </div>
  )
}

export default OrderDetails
