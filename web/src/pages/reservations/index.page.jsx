import PageHeader from '@/components/organisms/PageHeader'
import TemplateGSD from '@/components/templates/TemplateGSD'
import Link from 'next/link'
import { Button } from 'flowbite-react'
import Table from '@/components/organisms/Table'
import Loading from '@/components/atoms/Loading'
import TextInput from '@/components/organisms/TextInput'
import useHooks from './hooks'
import { capitalizeFirstLetter, formatDate, formatTime } from '@/hooks/lib/util'
import Pagination from '@/components/organisms/Pagination'
import { facilitieOptions } from '@/hooks/const'

const Reservation = () => {
  const {
    reservations,
    isLoading,
    breadcrumbs,
    totalPages,
    currentPage,
    onPageChange,
  } = useHooks()

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
        // Find the facility object with the matching value
        const facility = facilitieOptions.find(
          (option) => option.value === row.facilities,
        )
        return facility ? facility.label : 'Unknown'
      },
    },
    {
      key: 'activity',
      header: 'Activity',
      render: (row) => capitalizeFirstLetter(row.activity),
    },
    {
      key: 'representative',
      header: 'Representative',
      render: (row) => row.representative,
    },
  ]

  return (
    <TemplateGSD>
      <section>
        <PageHeader
          breadcrumbs={breadcrumbs}
          right={
            <Link href='/reservations/new'>
              <Button size='xs' color='success' href='/reservations/new'>
                Create Reservation
              </Button>
            </Link>
          }
        />
        <div className='flex pb-4 space-x-4'>
          <TextInput
            name='keyword'
            label='Search Description'
            className='w-80'
            // {...formState}
            variant='outlined'
            color='success'
          />
        </div>

        {isLoading ?
          <Loading />
        : <Table rows={rows} data={reservations.data} />}
      </section>
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    </TemplateGSD>
  )
}

export default Reservation
