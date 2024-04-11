import { Badge } from 'flowbite-react'

import { capitalizeFirstLetter } from '@/hooks/lib/util'

const StatusBadge = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'delivered':
        return 'success'
      case 'open':
        return 'gray'
      case 'in-transit':
        return 'info'
      case 'cancelled':
        return 'failure'
      case 'onhold':
        return 'warning'
      default:
        return 'gray'
    }
  }

  return (
    <Badge color={getColor()} size='sm' className='w-20 justify-center'>
      {capitalizeFirstLetter(status)}
    </Badge>
  )
}

export default StatusBadge
