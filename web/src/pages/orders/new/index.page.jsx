import PageHeader from '@/components/organisms/PageHeader'
import OrderForm from '@/components/templates/OrderForm'
import Template from '@/components/templates/Template'
import TemplateGSD from '@/components/templates/TemplateGSD'
import TemplateStaff from '@/components/templates/TemplateStaff'

import { FaList } from 'react-icons/fa'
import { useHooks } from './hooks'
import { useUser } from '@/hooks/redux/auth'

const Order = () => {
  const { formState, handleSubmit } = useHooks()
  const { user } = useUser()
  const breadcrumbs = [
    {
      href: '/orders',
      title: 'Requests',
      icon: FaList,
    },
    {
      href: '#',
      title: 'Request Create',
    },
  ]
  return (
    <div>
      {user.role === 'superadmin' ?
        <Template>
          <PageHeader breadcrumbs={breadcrumbs} />
          <section className='bg-white dark:bg-gray-900'>
            <div className='container mx-auto px-8 py-8'>
              <OrderForm handleSubmit={handleSubmit} formState={formState} />
            </div>
          </section>
        </Template>
      : user.role === 'subadmin' ?
        <TemplateGSD>
          <PageHeader breadcrumbs={breadcrumbs} />
          <section className='bg-white dark:bg-gray-900'>
            <div className='container mx-auto px-8 py-8'>
              <OrderForm handleSubmit={handleSubmit} formState={formState} />
            </div>
          </section>
        </TemplateGSD>
      : user.role === 'admin' ?
        <TemplateStaff>
          <PageHeader breadcrumbs={breadcrumbs} />
          <section className='bg-white dark:bg-gray-900'>
            <div className='container mx-auto px-8 py-8'>
              <OrderForm handleSubmit={handleSubmit} formState={formState} />
            </div>
          </section>
        </TemplateStaff>
      : <TemplateStaff>
          <PageHeader breadcrumbs={breadcrumbs} />
          <section className='bg-white dark:bg-gray-900'>
            <div className='container mx-auto px-8 py-8'>
              <OrderForm handleSubmit={handleSubmit} formState={formState} />
            </div>
          </section>
        </TemplateStaff>
      }
    </div>
  )
}

export default Order
