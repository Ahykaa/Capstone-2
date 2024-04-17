import { useForm } from 'react-hook-form'

import CardItem from '@/components/organisms/Card'
import { dashboardApi } from '@/hooks/api/dashboardApi'
import Chart from '../organisms/Chart'
import { useDepartments } from '@/hooks/redux/useDepartments'

const SuperAdminDasboard = () => {
  const { watch } = useForm()
  const { data } = dashboardApi.useGetDashboardQuery(watch())
  const { departments } = useDepartments()

  const cardData = [
    { title: data?.status_counts?.delivered ?? 0, description: 'Approved' },
    { title: data?.status_counts?.open ?? 0, description: 'Pending' },
    {
      title: data?.status_counts?.['in-transit'] ?? 0,
      description: 'Total Budget',
    },

    { title: data?.total_amount ?? 0, description: 'Total Utilized Budget' },
  ]
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
      data: [50, 74, 45, 50, 70, 31, 55, 21, 10, 29],
    },
  ]
  return (
    <div className='mx-auto max-w-screen-lg '>
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
