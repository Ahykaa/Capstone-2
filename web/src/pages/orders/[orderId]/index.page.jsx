import { useRouter } from 'next/router'
import { FaList } from 'react-icons/fa'

import Loading from '@/components/atoms/Loading'
import PageHeader from '@/components/organisms/PageHeader'

import Template from '@/components/templates/Template'

import useHooks from './hooks'

import { useUser } from '@/hooks/redux/auth'
import TemplateGSD from '@/components/templates/TemplateGSD'
import { Button } from 'flowbite-react'
import OrderDetails from '@/components/templates/OrderDetails'
import TemplateStaff from '@/components/templates/TemplateStaff'

const Order = () => {
  const router = useRouter()
  const { user } = useUser()
  const { orderId } = router.query
  const {
    order,
    isLoading,
    isApprovable,
    isUpdatingStatus,
    handleApprove,
    getButtonLabel,
  } = useHooks(orderId, user)

  const breadcrumbs = [
    {
      href: '/transaction',
      title: 'Transactions',
      icon: FaList,
    },
    {
      href: '#',
      title: 'Transaction Detail',
    },
  ]

  return (
    <div>
      {user.role === 'superadmin' ?
        <Template>
          <PageHeader breadcrumbs={breadcrumbs} />
          {isLoading || !order ?
            <Loading />
          : <section className='container mx-auto px-8 py-8'>
              <div className='flex flex-col'>
                <OrderDetails orderId={orderId} />
              </div>
              <div className='flex flex-col mt-4'>
                <div className='flex space-x-4'>
                  <Button
                    color='success'
                    className='flex w-1/4 mx-auto mt-4'
                    type='button'
                    onClick={handleApprove}
                    disabled={!isApprovable() || isUpdatingStatus}
                  >
                    {getButtonLabel()}
                  </Button>
                </div>
              </div>
            </section>
          }
        </Template>
      : user.role === 'admin' ?
        <TemplateStaff>
          <PageHeader breadcrumbs={breadcrumbs} />
          {isLoading || !order ?
            <Loading />
          : <section className='container mx-auto px-8 py-8'>
              <div className='flex flex-col'>
                <OrderDetails orderId={orderId} />
              </div>
              <div className='flex flex-col mt-4'>
                <div className='flex space-x-4'>
                  <Button
                    color='success'
                    className='flex w-1/4 mx-auto mt-4'
                    type='button' // Ensure type is set to 'button' to prevent form submission
                    onClick={handleApprove} // Call handleApprove function on button click
                    disabled={!isApprovable() || isUpdatingStatus}
                  >
                    {getButtonLabel()}
                  </Button>
                </div>
              </div>
            </section>
          }
        </TemplateStaff>
      : user.role === 'subadmin' ?
        <TemplateGSD>
          <PageHeader breadcrumbs={breadcrumbs} />
          {isLoading || !order ?
            <Loading />
          : <section className='container mx-auto px-8 py-8'>
              <div className='flex flex-col'>
                <OrderDetails orderId={orderId} />
              </div>
              <div className='flex flex-col mt-4'>
                <div className='flex space-x-4'>
                  <Button
                    color='success'
                    className='flex w-1/4 mx-auto mt-4'
                    type='button' // Ensure type is set to 'button' to prevent form submission
                    onClick={handleApprove} // Call handleApprove function on button click
                    disabled={!isApprovable() || isUpdatingStatus}
                  >
                    {getButtonLabel()}
                  </Button>
                </div>
              </div>
            </section>
          }
        </TemplateGSD>
      : user.role === 'subadmin1' || user.role === 'subadmin2' ?
        <TemplateStaff>
          <PageHeader breadcrumbs={breadcrumbs} />
          {isLoading || !order ?
            <Loading />
          : <section className='container mx-auto px-8 py-8'>
              <div className='flex flex-col'>
                <OrderDetails orderId={orderId} />
              </div>
              <div className='flex flex-col mt-4'>
                <div className='flex space-x-4'>
                  <Button
                    color='success'
                    className='flex w-1/4 mx-auto mt-4'
                    type='button' // Ensure type is set to 'button' to prevent form submission
                    onClick={handleApprove} // Call handleApprove function on button click
                    disabled={!isApprovable() || isUpdatingStatus}
                  >
                    {getButtonLabel()}
                  </Button>
                </div>
              </div>
            </section>
          }
        </TemplateStaff>
      : (
        user.role === 'subadmin3' ||
        user.role === 'subadmin4' ||
        user.role === 'headadmin'
      ) ?
        <TemplateStaff>
          <PageHeader breadcrumbs={breadcrumbs} />
          {isLoading || !order ?
            <Loading />
          : <section className='container mx-auto px-8 py-8'>
              <div className='flex flex-col'>
                <OrderDetails orderId={orderId} />
              </div>
              <div className='flex flex-col mt-4'>
                <div className='flex space-x-4'>
                  <Button
                    color='success'
                    className='flex w-1/4 mx-auto mt-4'
                    type='button' // Ensure type is set to 'button' to prevent form submission
                    onClick={handleApprove} // Call handleApprove function on button click
                    disabled={!isApprovable() || isUpdatingStatus}
                  >
                    {getButtonLabel()}
                  </Button>
                </div>
              </div>
            </section>
          }
        </TemplateStaff>
      : <TemplateStaff>
          <PageHeader breadcrumbs={breadcrumbs} />
          {isLoading || !order ?
            <Loading />
          : <section className='container mx-auto px-8 py-8'>
              <div className='flex flex-col'>
                <OrderDetails orderId={orderId} />
              </div>
            </section>
          }
        </TemplateStaff>
      }
    </div>
  )
}

export default Order
