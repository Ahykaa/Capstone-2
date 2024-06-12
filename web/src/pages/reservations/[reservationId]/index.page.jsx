// Reservation Component
import PageHeader from '@/components/organisms/PageHeader'
import RowItem from '@/components/organisms/RowItem'
import TemplateGSD from '@/components/templates/TemplateGSD'
import { useRouter } from 'next/router'
import { FaList } from 'react-icons/fa'
import useHooks from './hooks'
import Loading from '@/components/atoms/Loading'
import dayjs from 'dayjs'
import { formatAsMoney, formatTime, getFacilityLabels } from '@/hooks/lib/util'

const Reservation = () => {
  const router = useRouter()
  const { reservationId } = router.query

  const { reservation, reservation_entries, isLoading } =
    useHooks(reservationId)
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
          <div className='flex space-x-4'>
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

          <div>
            <h3 className='font-bold text-center'>Charges</h3>
            {reservation_entries && reservation_entries.length > 0 ?
              reservation_entries.map((entry, index) => (
                <div key={index} className='shadow-lg p-4 rounded-lg space-y-4'>
                  <div className='flex space-x-4'>
                    <div className='w-1/5'>
                      <RowItem label='Particulars' value={entry.particulars} />
                    </div>
                    <div className='w-1/5'>
                      <RowItem label='Quantity' value={entry.quantity} />
                    </div>
                    <div className='w-1/5'>
                      <RowItem label='Rate' value={entry.rate} />
                    </div>
                    <div className='w-1/5'>
                      <RowItem label='Amount' value={entry.amount} />
                    </div>
                    <div className='w-1/5'>
                      <RowItem label='Remarks' value={entry.remarks} />
                    </div>
                  </div>
                </div>
              ))
            : <div>No charges available</div>}
            <div className='flex justify-end mt-4'>
              <RowItem
                label='Total Amount'
                value={formatAsMoney(reservation.total_amount)}
                className='font-bold'
              />
            </div>
          </div>
        </section>
      }
    </TemplateGSD>
  )
}

export default Reservation
