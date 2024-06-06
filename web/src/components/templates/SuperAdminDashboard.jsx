import CardItem from '@/components/organisms/Card'
import Chart from '../organisms/Chart'
import { useDepartments } from '@/hooks/redux/useDepartments'
import { useUser } from '@/hooks/redux/auth'
import { formatAsMoney } from '@/hooks/lib/util'

const SuperAdminDasboard = () => {
  const { departments } = useDepartments()
  const { user } = useUser()

  // Filter department based on user's department_id
  const userDepartment = departments.find(
    (dept) => dept.id === user.department_id,
  )

  // Prepare card data
  const cardData = [
    { title: userDepartment?.budget ?? 0, description: 'Approved' },
    {
      title: userDepartment?.budget ?? 0,
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

  // Prepare chart data (you can use this if you want to display budgets of all departments in the chart)
  const chartOptions = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: departments.map((dept) => dept.label),
    },
  }
  const chartSeries = [
    {
      name: 'series-1',
      data: departments.map((dept) => dept.budget),
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
      <div className='grid'>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type='bar'
          className='w-full'
          name='Departmental Chart'
        />
      </div>
    </div>
  )
}

export default SuperAdminDasboard
