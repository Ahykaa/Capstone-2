import DatePicker from '@/components/organisms/DatePicker';
import TextInput from '@/components/organisms/TextInput';
import TemplateGSD from '@/components/templates/TemplateGSD';
import { useHooks } from './hooks';
import CheckboxInput from '@/components/organisms/Checkbox';
import { facilitieOptions, ownItems } from '@/hooks/const';
import PageHeader from '@/components/organisms/PageHeader';
import { MdOutlineBookmarkAdded } from 'react-icons/md';
import SelectInput from '@/components/organisms/SelectInput';
import TotalBox from '@/components/organisms/TotalBox';
import { useState } from 'react';

const Reservation = () => {
  const { control } = useHooks();

  const breadcrumbs = [
    {
      href: '#',
      title: 'Reservation Create',
      icon: MdOutlineBookmarkAdded,
    },
  ];
  const [totalAmount] = useState(0);
  return (
    <TemplateGSD>
      <PageHeader breadcrumbs={breadcrumbs} />
      <section className='bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-8 py-1'>
          <form action='' className='flex flex-col'>
            <div className='flex flex-col space-y-4'>
              <div className='shadow-lg p-4 rounded-lg text-center'>
                <span className='font-bold'>Facilities</span>

                <div className='mt-4'>
                  <CheckboxInput
                    name='requestOptions'
                    className='grid grid-cols-5 gap-4'
                    options={facilitieOptions}
                    // {...formState}
                    // onChange={formState.handleCheckboxChange}
                  />
                </div>
              </div>
              <div className='flex space-x-4 w-full'>
                <div className='w-full'>
                  <DatePicker
                    label='Date of Application'
                    name=''
                    control={control}
                  />
                </div>
                <TextInput
                  label='Company/Name'
                  name='name'
                  // {...formState}
                  variant='outlined'
                  color='success'
                />
                <TextInput
                  label='Address'
                  name='name'
                  // {...formState}
                  variant='outlined'
                  color='success'
                />
                <TextInput
                  label='Representative'
                  name='name'
                  // {...formState}
                  variant='outlined'
                  color='success'
                />
              </div>
              <div className='flex space-x-4 w-full'>
                <TextInput
                  label='Activity'
                  name='name'
                  // {...formState}
                  variant='outlined'
                  color='success'
                />
                <TextInput
                  label='Expected Number of Participants'
                  name='name'
                  // {...formState}
                  variant='outlined'
                  color='success'
                />
                <div className='w-full'>
                  <DatePicker label='Date of Event' name='' control={control} />
                </div>
                <TextInput
                  label='Time'
                  name='name'
                  // {...formState}
                  variant='outlined'
                  color='success'
                />
              </div>
              <div className='shadow-lg p-4 rounded-lg'>
                <div className='flex space-x-4'>
                  <div className='w-1/2'>
                    <SelectInput name='' options={ownItems} />
                  </div>
                  <div className='w-1/2'>
                    <TextInput
                      label='Quantity'
                      name=''
                      variant='filled'
                      color='success'
                    />
                  </div>
                  <div className='w-1/2'>
                    <TextInput
                      label='Rate'
                      name=''
                      variant='filled'
                      color='success'
                    />
                  </div>
                  <div className='w-1/2'>
                    <TextInput
                      label='Amount'
                      name=''
                      variant='filled'
                      color='success'
                    />
                  </div>
                </div>
                <div className='pace-x-4 mt-4'>
                  <TotalBox totalAmount={totalAmount} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </TemplateGSD>
  );
};
export default Reservation;
