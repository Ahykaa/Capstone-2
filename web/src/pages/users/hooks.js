import { useRouter } from 'next/router'
import { FaUserFriends } from 'react-icons/fa'

import { useUsers } from '@/hooks/redux/useUsers'
import { positionOptions } from '@/hooks/const'

const useHooks = () => {
  const router = useRouter()

  const { users, totalPages, isLoading } = useUsers(router.query.page || 1)

  const onPageChange = (page) => {
    router.push({ pathname: '/staffs', query: { page } })
  }

  const breadcrumbs = [
    {
      href: '#',
      title: 'Users',
      icon: FaUserFriends,
    },
  ]
  const getPositionLabel = (value) => {
    const position = positionOptions.find((option) => option.value === value)
    return position ? position.label : ''
  }

  return {
    users,
    isLoading,
    totalPages,
    currentPage: router.query.page || 1,
    onPageChange,
    breadcrumbs,
    getPositionLabel,
  }
}

export default useHooks
