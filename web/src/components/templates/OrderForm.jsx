import { Button } from 'flowbite-react';

import DatePicker from '@/components/organisms/DatePicker';
import SelectInput from '@/components/organisms/SelectInput';
import TextInput from '@/components/organisms/TextInput';

import { useDepartments } from '@/hooks/redux/useDepartments';
import TextAreaInput from '../organisms/TextAreaInput';
import { requestOptions } from '@/hooks/const';
import { useHooks } from '@/pages/orders/new/hooks';
import CheckboxInput from '../organisms/Checkbox';
import { useUnits } from '@/hooks/redux/useUnits';
import { capitalizeFirstLetter } from '@/hooks/lib/util';

const OrderForm = () => {
  const { handleSubmit, formState } = useHooks();
  const { departments } = useDepartments();
  const { units } = useUnits();

  return (
    <form onSubmit={handleSubmit} className='flex flex-col '>
      <div className='flex flex-col space-y-4'>
        <div className='flex space-x-4 w-full'>
          <div className='w-full'>
            <DatePicker label='Date' name='order_at' {...formState} />
          </div>
          <div className='w-full'>
            <DatePicker label='Date' name='date_needed' {...formState} />
          </div>
        </div>
        <div className='flex space-x-4 w-full'>
          <div className='w-full'>
            <TextInput
              label='From'
              name='from'
              {...formState}
              variant='outlined'
              color='success'
            />
          </div>
          <div className='w-full'>
            <SelectInput
              name='department_id'
              options={[
                { value: '', label: 'Departments', isDisabled: true },
                ...(departments?.map((department) => ({
                  value: department.id,
                  label: department.label,
                })) || []),
              ]}
              {...formState}
            />
          </div>
        </div>
        <span className='px-2 font-bold'>Request For</span>
        <CheckboxInput
          name='request_for'
          options={requestOptions}
          {...formState}
          onChange={formState.handleCheckboxChange}
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

        <Button color='success' type='submit' className='flex w-1/4 mx-auto'>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
