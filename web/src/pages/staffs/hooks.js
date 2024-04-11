import { useRouter } from 'next/router'
import { FaUserFriends } from 'react-icons/fa'

import { useUsers } from '@/hooks/redux/useUsers'

const useHooks = () => {
  const router = useRouter()

  const { users, totalPages, isLoading } = useUsers(router.query.page || 1)

  const onPageChange = (page) => {
    router.push({ pathname: '/staffs', query: { page } })
  }

  const breadcrumbs = [
    {
      href: '#',
      title: 'Staffs',
      icon: FaUserFriends,
    },
  ]

  return {
    users,
    isLoading,
    totalPages,
    currentPage: router.query.page || 1,
    onPageChange,
    breadcrumbs,
  }
}

export default useHooks
