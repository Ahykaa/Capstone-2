import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { FaList } from 'react-icons/fa'
import * as yup from 'yup'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useReservation } from '@/hooks/redux/useReservation'

const schema = yup.object({
  keyword: yup.string().nullable(),
  // status: yup.string().oneOf(statuses).nullable(),
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

  const { reservations, isLoading } = useReservation({ page, ...watch() })

  const totalPages = reservations.last_page || 1

  const onPageChange = (page) => {
    router.push({ pathname: '/reservations', query: { page } })
  }

  const breadcrumbs = [
    {
      href: '#',
      title: 'Reservations',
      icon: FaList,
    },
  ]

  console.log('Data', reservations)

  return {
    reservations,
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
