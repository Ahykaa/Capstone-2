import CardItem from '@/components/organisms/Card'
import { dashboardApi } from '@/hooks/api/dashboardApi'
import CalendarScheduler from '../organisms/CalendarScheduler'
import { useDepartments } from '@/hooks/redux/useDepartments'
import { useUser } from '@/hooks/redux/auth'
import { formatAsMoney, formatDate, formatTime } from '@/hooks/lib/util'
import Table from '../organisms/Table'
import { facilitieOptions } from '@/hooks/const'
import { useReservations } from '@/hooks/redux/useReservation'
import Loading from '../atoms/Loading'

const GsdAdminDashboard = () => {
  const { data } = dashboardApi.useGetDashboardQuery()
  const { departments } = useDepartments()
  const { user } = useUser()

  const userDepartment = departments.find(
    (dept) => dept.id === user.department_id,
  )

  const cardData = [
    { title: data?.status_counts?.delivered ?? 0, description: 'Approved' },
    { title: data?.status_counts?.open ?? 0, description: 'Pending' },
    {
      title: formatAsMoney(userDepartment?.budget ?? 0),
      description: 'Total Budget',
    },
    {
      title: formatAsMoney(userDepartment?.budgets ?? 0),
      description: 'Total Utilized Budget',
    },
  ]

  const rows = [
    {
      key: 'event_date',
      header: 'Event Date',
      render: (row) => formatDate(row.event_date),
    },
    {
      key: 'event_time',
      header: 'Event Time',
      render: (row) => formatTime(row.event_time),
    },
    {
      key: 'facilities',
      header: 'Facilities',
      render: (row) => {
        const facility = facilitieOptions.find(
          (option) => option.value === row.facilities,
        )
        return facility ? facility.label : 'Unknown'
      },
    },
    {
      key: 'representative',
      header: 'Representative',
      render: (row) => row.representative,
    },
  ]

  const { reservations, isLoading } = useReservations()

  return (
    <div>
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
      <div className='flex mt-8'>
        <div className='w-1/2 p-4'>
          <CalendarScheduler />
        </div>
        <div className='w-1/2 shadow-lg p-4 rounded-lg text-center'>
          <span className='font-bold'>Reservations Schedule</span>
          {isLoading ?
            <Loading />
          : <Table rows={rows} data={reservations.data} />}
        </div>
      </div>
    </div>
  )
}

export default GsdAdminDashboard
