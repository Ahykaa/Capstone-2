import CardItem from '@/components/organisms/Card'
import { dashboardApi } from '@/hooks/api/dashboardApi'
import CalendarScheduler from '../organisms/CalendarScheduler'
import Table from '../organisms/Table'

const GsdAdminDashboard = () => {
  const { data } = dashboardApi.useGetDashboardQuery()

  const cardData = [
    { title: data?.status_counts?.delivered ?? 0, description: 'Approved' },
    { title: data?.status_counts?.open ?? 0, description: 'Pending' },
    {
      title: data?.status_counts?.['in-transit'] ?? 0,
      description: 'Total Budget',
    },

    { title: data?.total_amount ?? 0, description: 'Total Utilized Budget' },
  ]

  const rows = []
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
      <div className='grid grid-cols-2 gap-4'>
        <div className='mt-8 w-full'>
          <CalendarScheduler />
        </div>
        <div className='w-full'>
          {/* <span>Booking Schedule</span>
          <Table rows={rows} data={data} /> */}
        </div>
      </div>
    </div>
  )
}

export default GsdAdminDashboard
