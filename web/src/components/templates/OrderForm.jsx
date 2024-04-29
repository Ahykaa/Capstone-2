import React from 'react';
import { Button } from 'flowbite-react';
import DatePicker from '@/components/organisms/DatePicker';
import SelectInput from '@/components/organisms/SelectInput';
import TextInput from '@/components/organisms/TextInput';
import TextAreaInput from '../organisms/TextAreaInput';
import { requestOptions } from '@/hooks/const';
import { useHooks } from '@/pages/orders/new/hooks';
import CheckboxInput from '../organisms/Checkbox';
import { useUnits } from '@/hooks/redux/useUnits';
import { capitalizeFirstLetter } from '@/hooks/lib/util';
import { HiPlus } from 'react-icons/hi';

const OrderForm = () => {
  const { handleSubmit, formState } = useHooks();
  const { units } = useUnits();

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
        <span className='px-2 font-bold'>Request For</span>
        <CheckboxInput
          name='request_for'
          options={requestOptions}
          {...formState}
        />
        <TextInput
          label='Specify if others'
          name='notes'
          {...formState}
          color='success'
          variant='outlined'
        />
        <div className='shadow-lg p-4 rounded-lg'>
          <div className='flex space-x-4'>
            <div className='w-1/6'>
              <TextInput
                label='Quantity'
                name='quantity'
                {...formState}
                variant='outlined'
                color='success'
              />
            </div>
            <div className='w-1/6'>
              <SelectInput
                name='unit_id'
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
            <div className='w-full'>
              <TextInput
                label='Particulars/Desc./Specs'
                name='description'
                {...formState}
                variant='outlined'
                color='success'
              />
            </div>
            <div className='w-1/2'>
              <TextInput
                label='Unit Cost'
                name='uniCost'
                {...formState}
                variant='outlined'
                color='success'
              />
            </div>
            <div className='w-1/2'>
              <TextInput
                label='Amount'
                name='amount'
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
              name='remarks'
              placeHolder='Remarks'
              {...formState}
            />
          </div>
        </div>

        <button
          type='button'
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
  );
};

export default OrderForm;
