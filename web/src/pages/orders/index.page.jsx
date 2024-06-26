import Link from 'next/link'
import { CiViewList } from 'react-icons/ci'

import Loading from '@/components/atoms/Loading'
import PageHeader from '@/components/organisms/PageHeader'
import Pagination from '@/components/organisms/Pagination'
import Table from '@/components/organisms/Table'
import Template from '@/components/templates/Template'
import { formatAsMoney, formatDate } from '@/hooks/lib/util'

import useHooks from './hooks'
import TextInput from '@/components/organisms/TextInput'
import { useUser } from '@/hooks/redux/auth'
import TemplateGSD from '@/components/templates/TemplateGSD'
import TemplateStaff from '@/components/templates/TemplateStaff'
import { useDepartments } from '@/hooks/redux/useDepartments'
import { useRequestFor } from '@/hooks/redux/useRequestFor'
import SelectInput from '@/components/organisms/SelectInput'
import { statusOptions } from '@/hooks/const'
import { Button } from 'flowbite-react'

const Order = () => {
  const {
    orders,
    isLoading,
    breadcrumbs,
    totalPages,
    currentPage,
    onPageChange,
    formState,
  } = useHooks()
  const { user } = useUser()

  const { departments, isLoading: isDepartmentsLoading } = useDepartments()
  const { requestFor } = useRequestFor()

  const departmentMap = departments.reduce((map, dept) => {
    map[dept.id] = dept.label
    return map
  }, {})

  const requestForMap =
    requestFor ?
      requestFor.reduce((map, reqFor) => {
        map[reqFor.id] = reqFor.label
        return map
      }, {})
    : {}

  const roleTemplates = {
    superadmin: Template,
    admin: TemplateStaff,
    subadmin: TemplateGSD,
    subadmin1: TemplateStaff,
    subadmin2: TemplateStaff,
    subadmin3: TemplateStaff,
    subadmin4: TemplateStaff,
    headadmin: TemplateStaff,
  }

  const RoleTemplate = roleTemplates[user.role] || TemplateStaff

  const getAction = (row) => {
    return (
      <div className='flex'>
        <div className='text-blue-500 text-xl'>
          <Link href={`/orders/${row.id}`}>
            <CiViewList />
          </Link>
        </div>
        View
      </div>
    )
  }

  const rows = [
    {
      key: 'order_at',
      header: 'Date Prepared',
      render: (row) => formatDate(row.order_at),
    },
    {
      key: 'date_needed',
      header: 'Date Needed',
      render: (row) => formatDate(row.date_needed),
    },
    {
      key: 'department',
      header: 'Department',
      render: (row) => departmentMap[row.department_id] || 'Unknown',
    },
    {
      key: 'requestFor',
      header: 'Request For',
      render: (row) => requestForMap[row.request_fors_id] || 'Unknown',
    },
    {
      key: 'amount',
      header: 'Total Amount',
      render: (row) => formatAsMoney(row.total_amount),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => row.status.label,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: getAction,
    },
  ]

  if (isLoading || isDepartmentsLoading) {
    return <Loading />
  }

  return (
    <RoleTemplate>
      <section>
        <PageHeader
          breadcrumbs={breadcrumbs}
          right={
            <Link href='/orders/new'>
              <Button size='xs' color='success' href='/orders/new'>
                Create Request
              </Button>
            </Link>
          }
        />
        <div className='flex pb-4 space-x-4'>
          <TextInput
            name='keyword'
            label='Search Department'
            className='w-80'
            {...formState}
            variant='outlined'
            color='success'
          />
          <SelectInput
            name='status'
            className='w-80'
            options={statusOptions}
            {...formState}
          />
        </div>
        <Table
          rows={rows}
          data={orders.data}
          rowClassName={(row) => {
            if (
              user.role !== 'staff' &&
              user.role !== 'admin' &&
              row.department_id === user.department_id
            ) {
              return 'bg-green-200'
            }
            return ''
          }}
        />
      </section>

      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    </RoleTemplate>
  )
}
export default Order
