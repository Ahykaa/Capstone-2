import PageHeader from '@/components/organisms/PageHeader'
import RowItem from '@/components/organisms/RowItem'
import TemplateGSD from '@/components/templates/TemplateGSD'
import { useRouter } from 'next/router'
import { FaList } from 'react-icons/fa'
import useHooks from './hooks'
import Loading from '@/components/atoms/Loading'
import dayjs from 'dayjs'
import { formatTime, getFacilityLabels } from '@/hooks/lib/util'

const Reservation = () => {
  const router = useRouter()
  const { reservationId } = router.query

  const { reservation, isLoading } = useHooks(reservationId)
  const breadcrumbs = [
    {
      href: '/reservations',
      title: 'Reservations',
      icon: FaList,
    },
    {
      href: '#',
      title: 'Reservation Detail',
    },
  ]

  return (
    <TemplateGSD>
      <PageHeader breadcrumbs={breadcrumbs} />
      {isLoading || !reservation ?
        <Loading />
      : <section className='flex flex-col space-y-4'>
          <div className='flex space-x-4 '>
            <div className='w-full'>
              <RowItem
                label='Facilities'
                value={getFacilityLabels(reservation.facilities)}
              />
            </div>
            <div className='w-full'>
              <RowItem
                label='Date Prepared'
                value={dayjs(reservation.reserv_at).format('MMM DD, YYYY')}
              />
            </div>
            <div className='w-full'>
              <RowItem
                label='Time Prepared'
                value={formatTime(reservation.time_at)}
              />
            </div>
          </div>
          <div className='flex space-x-4'>
            <div className='w-full'>
              <RowItem label='Company/Name' value={reservation.company_name} />
            </div>
            <div className='w-full'>
              <RowItem
                label='Representative'
                value={reservation.representative}
              />
            </div>
          </div>
          <div className='flex space-x-4'>
            <div className='w-full'>
              <RowItem label='Address' value={reservation.address} />
            </div>
            <div className='w-full'>
              <RowItem label='Activity' value={reservation.activity} />
            </div>
          </div>
          <div className='flex space-x-4'>
            <div className='w-full'>
              <RowItem
                label='Expected Number of Participants'
                value={reservation.no_participants}
              />
            </div>
            <div className='w-full'>
              <RowItem
                label='Event Date'
                value={dayjs(reservation.event_date).format('MMM DD, YYYY')}
              />
            </div>
            <div className='w-full'>
              <RowItem
                label='Event Time'
                value={formatTime(reservation.event_time)}
              />
            </div>
          </div>
          <div className='flex space-x-4'>
            <div className='w-full'>
              <RowItem
                label='Owned Items (To be used during the activity)'
                value={reservation.ownItems}
              />
            </div>
          </div>

          <div className='shadow-lg p-4 rounded-lg space-y-4 text-center'>
            <span className='font-bold g-4'>Charges</span>
            <div className='flex space-x-4'>
              <div className='w-1/2'>
                <RowItem label='Particulars' value={reservation.particulars} />
              </div>
              <div className='w-1/2'>
                <RowItem label='Quantity' value={reservation.quantity} />
              </div>
              <div className='w-1/2'>
                <RowItem label='Rate' value={reservation.rate} />
              </div>
              <div className='w-1/2'>
                <RowItem label='Amount' value={reservation.amount} />
              </div>
              <div className='w-1/2'>
                <RowItem label='Remarks' />
              </div>
            </div>
          </div>
        </section>
      }
    </TemplateGSD>
  )
}

export default Reservation
