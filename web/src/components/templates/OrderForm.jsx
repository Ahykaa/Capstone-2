import React, { useState } from 'react'
import { Button } from 'flowbite-react'
import DatePicker from '@/components/organisms/DatePicker'
import SelectInput from '@/components/organisms/SelectInput'
import TextInput from '@/components/organisms/TextInput'
import TextAreaInput from '../organisms/TextAreaInput'
import { useHooks } from '@/pages/orders/new/hooks'
import { useUnits } from '@/hooks/redux/useUnits'
import { capitalizeFirstLetter } from '@/hooks/lib/util'
import { HiPlus } from 'react-icons/hi'
import { useRequestFor } from '@/hooks/redux/useRequestFor'

const OrderForm = () => {
  const { handleSubmit, formState } = useHooks()
  const { units } = useUnits()
  const { requestFor } = useRequestFor()
  const [entries, setEntries] = useState([{ id: Date.now() }]) // Initialize with one entry

  const addEntry = () => {
    setEntries([...entries, { id: Date.now() }])
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <div className='flex flex-col space-y-4'>
        <div className='flex space-x-4 w-full'>
          <div className='w-full'>
            <DatePicker
              label='Date Prepared'
              name='order_at'
              disabled
              {...formState}
            />
          </div>
          <div className='w-full'>
            <DatePicker label='Date Needed' name='date_needed' {...formState} />
          </div>
        </div>

        <div className='flex space-x-4 w-full'>
          <div className='w-full mb-4'>
            <SelectInput
              name='request_fors_id'
              options={[
                {
                  value: '',
                  label: capitalizeFirstLetter('Request For'),
                  isDisabled: true,
                },
                ...(requestFor?.map((requestfor) => ({
                  value: requestfor.id,
                  label: capitalizeFirstLetter(requestfor.label),
                })) || []),
              ]}
              {...formState}
            />
          </div>
          <div className='w-full mb-4'>
            <TextInput
              label='Specify if others'
              name='notes'
              {...formState}
              color='success'
              variant='outlined'
            />
          </div>
        </div>
        {entries.map((entry, index) => (
          <div key={entry.id} className='shadow-lg p-4 rounded-lg g-4'>
            <div className='flex space-x-4'>
              <div className='w-1/6'>
                <TextInput
                  label='Quantity'
                  name={`entries[${index}].quantity`}
                  {...formState}
                  variant='outlined'
                  color='success'
                />
              </div>
              <div className='w-1/6'>
                <SelectInput
                  name={`entries[${index}].unit_id`}
                  options={[
                    {
                      value: '',
                      label: capitalizeFirstLetter('Unit'),
                      isDisabled: true,
                    },
                    ...(units?.map((unit) => ({
                      value: unit.id,
                      label: capitalizeFirstLetter(unit.label),
                    })) || []),
                  ]}
                  {...formState}
                />
              </div>
              <div className='w-2/6'>
                <TextInput
                  label='Particulars/Desc./Specs'
                  name={`entries[${index}].description`}
                  {...formState}
                  variant='outlined'
                  color='success'
                />
              </div>
              <div className='w-1/6'>
                <TextInput
                  label='Unit Cost'
                  name={`entries[${index}].uniCost`}
                  {...formState}
                  variant='outlined'
                  color='success'
                />
              </div>
              <div className='w-1/6'>
                <TextInput
                  label='Amount'
                  name={`entries[${index}].amount`}
                  readOnly
                  {...formState}
                  variant='outlined'
                  color='success'
                />
              </div>
            </div>
            <div className='w-full mt-4'>
              <TextAreaInput
                label='Remarks'
                name={`entries[${index}].remarks`}
                placeHolder='Remarks'
                {...formState}
              />
            </div>
          </div>
        ))}

        <button
          type='button'
          onClick={addEntry}
          className='text-black-500 flex items-center justify-center w-1/4 mx-auto mt-4'
          color='success'
        >
          <HiPlus className='inline-block mr-1' />
          Add Entry
        </button>
        <Button color='success' type='submit' className='flex w-1/4 mx-auto'>
          Submit
        </Button>
      </div>
    </form>
  )
}

export default OrderForm
