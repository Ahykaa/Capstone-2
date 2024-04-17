import { Button } from 'flowbite-react';
import React from 'react';
import { FaUserFriends } from 'react-icons/fa';

import PageHeader from '@/components/organisms/PageHeader';
import TextInput from '@/components/organisms/TextInput';
import AdminGuard from '@/components/templates/AdminGuard';
import Template from '@/components/templates/Template';

import { useHooks } from './hooks';
import SelectInput from '@/components/organisms/SelectInput';
import { roles } from '@/hooks/const';

const AddStaff = () => {
  const { formState, handleSubmit } = useHooks();
  const breadcrumbs = [
    {
      href: '/staffs',
      title: 'Staffs',
      icon: FaUserFriends,
    },
    {
      href: '#',
      title: 'Staff Create',
    },
  ];

  return (
    <Template>
      <AdminGuard>
        <PageHeader breadcrumbs={breadcrumbs} />

        <form
          className='flex center w-80 flex-col gap-2'
          onSubmit={handleSubmit}
        >
          <TextInput
            label='Name'
            name='name'
            {...formState}
            variant='outlined'
            color='success'
          />
          <TextInput
            label='Username'
            name='username'
            {...formState}
            variant='outlined'
            color='success'
          />
          <TextInput
            label='Department'
            name='department'
            {...formState}
            variant='outlined'
            color='success'
          />
          <TextInput
            label='Position'
            name='position'
            {...formState}
            variant='outlined'
            color='success'
          />

          <SelectInput
            label='Account Type'
            name='role'
            options={roles}
            {...formState}
          />

          <div className='flex justify-center'>
            <Button color='success' type='submit' style={{ width: 140 }}>
              Submit
            </Button>
          </div>
        </form>
      </AdminGuard>
    </Template>
  );
};

export default AddStaff;
