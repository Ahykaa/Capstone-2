import { Button } from 'flowbite-react';
import React from 'react';
import { FaUserFriends } from 'react-icons/fa';

import PageHeader from '@/components/organisms/PageHeader';
import TextInput from '@/components/organisms/TextInput';
import AdminGuard from '@/components/templates/AdminGuard';
import Template from '@/components/templates/Template';

import { useHooks } from './hooks';
import SelectInput from '@/components/organisms/SelectInput';
import { positionOptions, roles } from '@/hooks/const';
import { useDepartments } from '@/hooks/redux/useDepartments';

const AddStaff = () => {
  const { formState, handleSubmit } = useHooks();
  const { departments } = useDepartments();

  const breadcrumbs = [
    {
      href: '/users',
      title: 'Users',
      icon: FaUserFriends,
    },
    {
      href: '#',
      title: 'User Create',
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
          <SelectInput
            name='department_id'
            className='mb-2'
            options={[
              { value: '', label: 'Departments', isDisabled: true },
              ...(departments?.map((department) => ({
                value: department.id,
                label: department.label,
              })) || []),
            ]}
            {...formState}
          />

          <SelectInput
            name='position'
            options={[
              { label: 'Position', value: '' },
              ...positionOptions.map((option) => ({
                value: option.value,
                label: option.label,
              })),
            ]}
            {...formState}
          />

          <SelectInput
            name='role'
            options={[
              { label: 'Account Type', value: '' },
              ...roles.map((option) => ({
                value: option.value,
                label: option.label,
              })),
            ]}
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
