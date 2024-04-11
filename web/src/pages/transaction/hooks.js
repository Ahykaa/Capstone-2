import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { FaList } from 'react-icons/fa'
import * as yup from 'yup'

import { useOrders } from '@/hooks/redux/useOrders'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { statuses } from '@/hooks/lib/statuses'

const schema = yup.object({
  keyword: yup.string().nullable(),
  status: yup.string().oneOf(statuses).nullable(),
})

const useHooks = () => {
  const router = useRouter()
  const page = useMemo(() => router.query.page ?? 1, [router.query.page])

  const {
    register,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      keyword: null,
      status: 0,
    },
    resolver: yupResolver(schema),
  })

  const { orders, isLoading } = useOrders({ page, ...watch() })

  const totalPages = orders.last_page || 1

  const onPageChange = (page) => {
    router.push({ pathname: '/orders', query: { page } })
  }

  const breadcrumbs = [
    {
      href: '/transaction',
      title: 'Transaction',
      icon: FaList,
    },
  ]

  return {
    orders,
    isLoading,
    breadcrumbs,
    totalPages,
    currentPage: page,
    onPageChange,
    formState: {
      errors,
      register,
    },
  }
}

export default useHooks
