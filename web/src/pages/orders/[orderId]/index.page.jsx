import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import {
  FaCalendarAlt,
  FaList,
  FaUser,
  FaLayerGroup,
  FaCheckSquare,
  FaBars,
} from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import Loading from '@/components/atoms/Loading';
import PageHeader from '@/components/organisms/PageHeader';
import RowItem from '@/components/organisms/RowItem';
import Template from '@/components/templates/Template';

import useHooks from './hooks';
import { capitalizeFirstLetter } from '@/hooks/lib/util';
import { useUser } from '@/hooks/redux/auth';
import TemplateGSD from '@/components/templates/TemplateGSD';

const Order = () => {
  const router = useRouter();
  const { user } = useUser();
  const { orderId } = router.query;

  const { order, isLoading } = useHooks(orderId);

  const breadcrumbs = [
    {
      href: '/transaction',
      title: 'Transaction',
      icon: FaList,
    },
    {
      href: '#',
      title: 'Transaction Detail',
    },
  ];

  return (
    <div>
      {user.role === 'admin' ? (
        <Template>
          <PageHeader breadcrumbs={breadcrumbs} />
          {isLoading || !order ? (
            <Loading />
          ) : (
            <section className='container mx-auto px-8 py-8'>
              <div className='flex flex-col'>
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
                      <RowItem
                        label='From'
                        value={order.from}
                        icon={<FaUser />}
                      />
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
                      <RowItem label='Unit Cost' value={order.uniCost} />
                      <RowItem label='Amount' value={order.amount} />
                    </div>
                    <RowItem label='Remarks' value={order.remarks} />
                  </div>
                </div>
              </div>
            </section>
          )}
        </Template>
      ) : user.role === 'subadmin' ? (
        <TemplateGSD>
          <PageHeader breadcrumbs={breadcrumbs} />
          {isLoading || !order ? (
            <Loading />
          ) : (
            <section className='container mx-auto px-8 py-8'>
              <div className='flex flex-col'>
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
                      <RowItem
                        label='From'
                        value={order.from}
                        icon={<FaUser />}
                      />
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
                      <RowItem label='Unit Cost' value={order.uniCost} />
                      <RowItem label='Amount' value={order.amount} />
                    </div>
                    <RowItem label='Remarks' value={order.remarks} />
                  </div>
                </div>
              </div>
            </section>
          )}
        </TemplateGSD>
      ) : (
        <Template>
          <PageHeader breadcrumbs={breadcrumbs} />
          {isLoading || !order ? (
            <Loading />
          ) : (
            <section className='container mx-auto px-8 py-8'>
              <div className='flex flex-col'>
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
                      <RowItem
                        label='From'
                        value={order.from}
                        icon={<FaUser />}
                      />
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
                      <RowItem label='Unit Cost' value={order.uniCost} />
                      <RowItem label='Amount' value={order.amount} />
                    </div>
                    <RowItem label='Remarks' value={order.remarks} />
                  </div>
                </div>
              </div>
            </section>
          )}
        </Template>
      )}
    </div>
  );
};

export default Order;
