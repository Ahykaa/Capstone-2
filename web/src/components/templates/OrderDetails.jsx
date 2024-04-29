import dayjs from 'dayjs';
import RowItem from '../organisms/RowItem';

import {
  FaCalendarAlt,
  FaUser,
  FaLayerGroup,
  FaCheckSquare,
  FaBars,
} from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import useHooks from '@/pages/orders/[orderId]/hooks';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/redux/auth';
import { capitalizeFirstLetter, formatAsMoney } from '@/hooks/lib/util';

const OrderDetails = () => {
  const router = useRouter();
  const { user } = useUser();

  const { orderId } = router.query;
  const { order } = useHooks(orderId, user);

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex space-x-4 w-full'>
        <div className='w-full'>
          <RowItem
            label='Date Prepared'
            value={dayjs(order.order_at).format('MMM DD, YYYY')}
            order
            icon={<FaCalendarAlt />}
          />
        </div>
        <div className='w-full'>
          <RowItem
            label='Date Needed'
            value={dayjs(order.date_needed).format('MMM DD, YYYY')}
            order
            icon={<FaCalendarAlt />}
          />
        </div>
        <div className='w-full'>
          <RowItem
            label='Status'
            value={order.status.label}
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
            value={order.department.label}
            icon={<FaLayerGroup />}
          />
        </div>
      </div>
      <div className='flex space-x-4 w-full'>
        <div className='w-full'>
          <RowItem
            label='Request For'
            value={order.request_for}
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
      <div className='shadow-lg p-4 rounded-lg'>
        <div className='flex space-x-4'>
          <RowItem label='Quantity' value={order.quantity} />
          <RowItem
            label='Unit'
            value={capitalizeFirstLetter(order.unit.label)}
          />
          <RowItem label='Description' value={order.description} />
          <RowItem label='Unit Cost' value={formatAsMoney(order.uniCost)} />
          <RowItem label='Amount' value={formatAsMoney(order.amount)} />
        </div>
        <RowItem label='Remarks' value={order.remarks} />
      </div>
    </div>
  );
};

export default OrderDetails;
