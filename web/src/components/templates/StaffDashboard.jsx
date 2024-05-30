import React from 'react'
import { useDepartments } from '@/hooks/redux/useDepartments'
import { useUser } from '@/hooks/redux/auth'

import CardItem from '@/components/organisms/Card'
import { formatAsMoney } from '@/hooks/lib/util'

const StaffDashboard = () => {
  const { departments } = useDepartments()
  const { user } = useUser()

  // Filter department based on user's department_id
  const userDepartment = departments.find(
    (dept) => dept.id === user.department_id,
  )
  const cardData = [
    { title: userDepartment?.budgets ?? 0, description: 'Approved' },
    { title: userDepartment?.budgets ?? 0, description: 'Pending' },
    {
      title: formatAsMoney(userDepartment?.budget ?? 0),
      description: 'Total Budget',
    },
    {
      title: formatAsMoney(userDepartment?.budgets ?? 0),
      description: 'Total Utilized Budget',
    },
  ]
  return (
    <div className='mx-auto max-w-screen-lg mt-12'>
      <div className='grid grid-cols-4 gap-4'>
        {cardData.map((card, index) => (
          <CardItem
            key={index}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  )
}

export default StaffDashboard
