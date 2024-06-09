import React from 'react'
import { useDepartments } from '@/hooks/redux/useDepartments'
import { dashboardApi } from '@/hooks/api/dashboardApi'
import { useUser } from '@/hooks/redux/auth'

import CardItem from '@/components/organisms/Card'
import { formatAsMoney } from '@/hooks/lib/util'

const StaffDashboard = () => {
  const { data } = dashboardApi.useGetDashboardQuery()
  const { departments } = useDepartments()
  const { user } = useUser()

  // Filter department based on user's department_id
  const userDepartment = departments.find(
    (dept) => dept.id === user.department_id,
  )
  const userDepartmentStatusCounts =
    data?.status_counts_per_department?.[user.department_id] ?? {}

  const cardData = [
    { title: userDepartmentStatusCounts[9] ?? 0, description: 'Approved' },
    {
      title: userDepartmentStatusCounts['pending'] ?? 0,
      description: 'Pending',
    },
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
    <div className='mx-auto max-w-screen-lg'>
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
