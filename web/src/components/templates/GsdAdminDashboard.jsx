import React, { useState } from 'react'
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
import Pagination from '../organisms/Pagination'

const GsdAdminDashboard = () => {
  const { data } = dashboardApi.useGetDashboardQuery()
  const { departments } = useDepartments()
  const { user } = useUser()

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
      title: formatAsMoney(userDepartment?.budget - data?.approved_amount ?? 0),
      description: 'Total Budget',
    },
    {
      title: formatAsMoney(data?.approved_amount ?? 0),
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

  // State to keep track of the selected month and year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  // Handle month change
  const handleMonthChange = (month, year) => {
    setSelectedMonth(month)
    setSelectedYear(year)
  }

  // Filter reservations based on the selected month and year
  const filteredReservations =
    reservations?.data?.filter((reservation) => {
      const eventDate = new Date(reservation.event_date)
      return (
        eventDate.getMonth() === selectedMonth &&
        eventDate.getFullYear() === selectedYear
      )
    }) || []

  const bookedDates = filteredReservations.map(
    (reservation) => new Date(reservation.event_date),
  )

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Calculate the total number of pages
  const totalPages = Math.ceil(
    (filteredReservations.length || 0) / itemsPerPage,
  )

  // Get current reservations based on pagination
  const currentReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

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
          <CalendarScheduler
            bookedDates={bookedDates}
            onMonthChange={handleMonthChange}
          />
        </div>
        <div className='w-1/2 shadow-lg p-4 rounded-lg text-center'>
          <span className='font-bold'>Reservations Schedule</span>
          {isLoading ?
            <Loading />
          : <>
              <Table rows={rows} data={currentReservations} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default GsdAdminDashboard
