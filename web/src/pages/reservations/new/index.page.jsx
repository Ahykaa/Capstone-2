import React from 'react'
import DatePicker from '@/components/organisms/DatePicker'
import TextInput from '@/components/organisms/TextInput'
import TemplateGSD from '@/components/templates/TemplateGSD'
import { useHooks } from './hooks'
import { facilitieOptions, particulars } from '@/hooks/const'
import PageHeader from '@/components/organisms/PageHeader'
import { MdOutlineBookmarkAdded } from 'react-icons/md'
import SelectInput from '@/components/organisms/SelectInput'
import TimePicker from '@/components/organisms/TimePicker'
import { Button } from 'flowbite-react'
import { FaList } from 'react-icons/fa'
import TextAreaInput from '@/components/organisms/TextAreaInput'

const Reservation = () => {
  const { formState, handleSubmit, control } = useHooks()

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
          <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <div className='flex space-x-4 w-full'>
              <div className='w-full mb-4'>
                <SelectInput
                  name='facilities'
                  options={facilitieOptions}
                  {...formState}
                />
              </div>
              <div className='w-full mb-4'>
                <DatePicker
                  placeholder='Date Prepared'
                  name='reserv_at'
                  control={control}
                  {...formState}
                />
              </div>
              <div className='w-full mb-4'>
                <TimePicker name='time_at' control={control} {...formState} />
              </div>
            </div>
            <div className='flex space-x-4 w-full'>
              <TextInput
                label='Company/Name'
                name='company_name'
                control={control}
                {...formState}
                variant='outlined'
                color='success'
              />
              <TextInput
                label='Representative'
                name='representative'
                control={control}
                {...formState}
                variant='outlined'
                color='success'
              />
            </div>
            <div className='flex space-x-4 w-full'>
              <TextInput
                label='Address'
                name='address'
                control={control}
                {...formState}
                variant='outlined'
                color='success'
              />
              <TextInput
                label='Activity'
                name='activity'
                control={control}
                {...formState}
                variant='outlined'
                color='success'
              />
            </div>
            <div className='flex space-x-4 w-full'>
              <TextInput
                label='Expected Number of Participants'
                name='no_participants'
                control={control}
                {...formState}
                variant='outlined'
                color='success'
              />
              <div className='w-full'>
                <DatePicker
                  name='event_date'
                  placeholder='Date of Event'
                  control={control}
                  {...formState}
                />
              </div>
              <div className='w-full'>
                <TimePicker
                  name='event_time'
                  control={control}
                  {...formState}
                />
              </div>
            </div>
            <div className='flex space-x-4 w-full'>
              <TextAreaInput
                label='Own Items'
                name='ownItems'
                placeholder='Own Items'
                control={control}
                {...formState}
              />
            </div>
            <div className='shadow-lg p-4 rounded-lg text-center'>
              <span className='font-bold'>Charges</span>
              <div className='flex space-x-4'>
                <div className='w-1/2'>
                  <SelectInput
                    name='particulars'
                    options={[
                      { value: 0, label: 'Select Items', disabled: true },
                      ...particulars,
                    ]}
                    control={control}
                    {...formState}
                  />
                </div>
                <div className='w-1/2'>
                  <TextInput
                    label='Quantity'
                    name='quantity'
                    variant='filled'
                    control={control}
                    color='success'
                    {...formState}
                  />
                </div>
                <div className='w-1/2'>
                  <TextInput
                    label='Rate'
                    name='rate'
                    variant='filled'
                    control={control}
                    color='success'
                    {...formState}
                  />
                </div>
                <div className='w-1/2'>
                  <TextInput
                    label='Amount'
                    name='amount'
                    variant='filled'
                    control={control}
                    color='success'
                    {...formState}
                  />
                </div>
              </div>
            </div>
            <Button
              color='success'
              type='submit'
              className='flex w-1/4 mx-auto'
            >
              Submit
            </Button>
          </form>
        </div>
      </section>
    </TemplateGSD>
  )
}

export default Reservation
