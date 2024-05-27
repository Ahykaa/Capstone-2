import DatePicker from '@/components/organisms/DatePicker'
import TextInput from '@/components/organisms/TextInput'
import TemplateGSD from '@/components/templates/TemplateGSD'
import { useHooks } from './hooks'

import { facilitieOptions, particulars } from '@/hooks/const'
import PageHeader from '@/components/organisms/PageHeader'
import { MdOutlineBookmarkAdded } from 'react-icons/md'
import SelectInput from '@/components/organisms/SelectInput'
import TotalBox from '@/components/organisms/TotalBox'
import { useState } from 'react'
import CheckboxReserv from '@/components/organisms/CheckboxReserv'
import TimePicker from '@/components/organisms/TimePicker'
import { Button } from 'flowbite-react'
import { FaList } from 'react-icons/fa'
import TextAreaInput from '@/components/organisms/TextAreaInput'

const Reservation = () => {
  const { formState, handleSubmit } = useHooks()
  const [totalAmount] = useState(0)
  const [selectedTime, setSelectedTime] = useState('00:00')

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value)
  }

  const breadcrumbs = [
    {
      href: '/reservations',
      title: 'Reservations',
      icon: FaList,
    },
    {
      href: '#',
      title: 'Reservation Create',
      icon: MdOutlineBookmarkAdded,
    },
  ]

  return (
    <TemplateGSD>
      <PageHeader breadcrumbs={breadcrumbs} />
      <section className='bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-8 py-1'>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <div className='flex flex-col space-y-4'>
              <div className='shadow-lg p-4 rounded-lg text-center'>
                <span className='font-bold'>Facilities</span>

                <div className='mt-4'>
                  <CheckboxReserv
                    name='facilities'
                    className='grid grid-cols-5 gap-4'
                    options={facilitieOptions}
                    {...formState}
                    // onChange={formState.handleCheckboxChange}
                  />
                </div>
              </div>
              <div className='flex space-x-4 w-full'>
                <div className='w-full'>
                  <DatePicker
                    placeholder='Date Prepared'
                    name='reserv_at'
                    disabled
                    {...formState}
                  />
                </div>
                <div className='w-full '>
                  <TimePicker
                    id='time'
                    min='09:00'
                    max='18:00'
                    name='time_at'
                    disabled
                    {...formState}
                    value={selectedTime}
                    onChange={handleTimeChange}
                  />
                </div>
              </div>
              <div className='flex space-x-4 w-full'>
                <TextInput
                  label='Company/Name'
                  name='company_name'
                  {...formState}
                  variant='outlined'
                  color='success'
                />
                <TextInput
                  label='Representative'
                  name='representative'
                  {...formState}
                  variant='outlined'
                  color='success'
                />
              </div>
              <div className='flex space-x-4 w-full'>
                <TextInput
                  label='Address'
                  name='address'
                  {...formState}
                  variant='outlined'
                  color='success'
                />
                <TextInput
                  label='Activity'
                  name='activity'
                  {...formState}
                  variant='outlined'
                  color='success'
                />
              </div>
              <div className='flex space-x-4 w-full'>
                <TextInput
                  label='Expected Number of Participants'
                  name='no_participants'
                  {...formState}
                  variant='outlined'
                  color='success'
                />
                <div className='w-full'>
                  <DatePicker
                    name='event_date'
                    placeholder='Date of Event'
                    {...formState}
                  />
                </div>
                <div className='w-full '>
                  <TimePicker
                    id='time'
                    min='09:00'
                    max='18:00'
                    name='event_time'
                    {...formState}
                    value={selectedTime}
                    onChange={handleTimeChange}
                  />
                </div>
              </div>
              <div className='flex space-x-4 w-full'>
                <TextAreaInput
                  label='Own Items'
                  name='ownItems'
                  placeHolder='Own Items'
                  {...formState}
                />
              </div>
              <div className='shadow-lg p-4 rounded-lg text-center'>
                <span className='font-bold g-4'>Charges</span>
                <div className='flex space-x-4'>
                  <div className='w-1/2'>
                    <SelectInput
                      name='particulars'
                      options={[
                        { value: 0, label: 'Select Items', disabled: true },
                        ...particulars,
                      ]}
                      {...formState}
                    />
                  </div>
                  <div className='w-1/2'>
                    <TextInput
                      label='Quantity'
                      name='quantity'
                      variant='filled'
                      color='success'
                      {...formState}
                    />
                  </div>
                  <div className='w-1/2'>
                    <TextInput
                      label='Rate'
                      name='rate'
                      variant='filled'
                      color='success'
                      {...formState}
                    />
                  </div>
                  <div className='w-1/2'>
                    <TextInput
                      label='Amount'
                      name='amount'
                      variant='filled'
                      color='success'
                      {...formState}
                    />
                  </div>
                </div>
                <div className='pace-x-4 mt-4'>
                  <TotalBox totalAmount={totalAmount} />
                </div>
              </div>
              <Button
                color='success'
                type='submit'
                className='flex w-1/4 mx-auto'
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </section>
    </TemplateGSD>
  )
}
export default Reservation
