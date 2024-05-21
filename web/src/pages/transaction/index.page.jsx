import Link from 'next/link';
import { CiViewList } from 'react-icons/ci';

import Loading from '@/components/atoms/Loading';
import PageHeader from '@/components/organisms/PageHeader';
import Pagination from '@/components/organisms/Pagination';
import Table from '@/components/organisms/Table';
import Template from '@/components/templates/Template';
import { formatDate } from '@/hooks/lib/util';

import useHooks from './hooks';
import TextInput from '@/components/organisms/TextInput';
import { useUser } from '@/hooks/redux/auth';
import TemplateGSD from '@/components/templates/TemplateGSD';
import TemplateStaff from '@/components/templates/TemplateStaff';
import { useDepartments } from '@/hooks/redux/useDepartments'; // Import the useDepartments hook

const Transaction = () => {
  const {
    orders,
    isLoading,
    breadcrumbs,
    totalPages,
    currentPage,
    onPageChange,
    formState,
  } = useHooks();
  const { user } = useUser();

  // Use the useDepartments hook to fetch department data
  const { departments, isLoading: isDepartmentsLoading } = useDepartments();

  // Create a mapping from department ID to department label
  const departmentMap = departments.reduce((map, dept) => {
    map[dept.id] = dept.label;
    return map;
  }, {});

  const roleTemplates = {
    superadmin: Template,
    admin: TemplateStaff,
    subadmin: TemplateGSD,
    subadmin1: TemplateStaff,
    subadmin2: TemplateStaff,
    subadmin3: TemplateStaff,
    subadmin4: TemplateStaff,
    headadmin: TemplateStaff,
  };

  const RoleTemplate = roleTemplates[user.role] || TemplateStaff;

  const getAction = (row) => {
    return (
      <div className='flex'>
        <div className='text-blue-500 text-xl'>
          <Link href={`/orders/${row.id}`}>
            <CiViewList />
          </Link>
        </div>
      </div>
    );
  };

  const rows = [
    {
      key: 'order_at',
      header: 'Date Prepared',
      render: (row) => formatDate(row.order_at),
    },
    {
      key: 'date_needed',
      header: 'Date Needed',
      render: (row) => formatDate(row.date_needed),
    },
    {
      key: 'department',
      header: 'Department',
      render: (row) => departmentMap[row.department_id] || 'Unknown', // Map department_id to label
    },
    {
      key: 'description',
      header: 'Description',
      render: (row) => row.description,
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (row) => row.amount,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => row.status.label,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: getAction,
    },
  ];

  if (isLoading || isDepartmentsLoading) {
    return <Loading />;
  }

  return (
    <RoleTemplate>
      <section>
        <PageHeader breadcrumbs={breadcrumbs} />
        <div className='flex pb-4 space-x-4'>
          <TextInput
            name='keyword'
            label='Search Description'
            className='w-80'
            {...formState}
            variant='outlined'
            color='success'
          />
        </div>
        <Table rows={rows} data={orders.data} />
      </section>

      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    </RoleTemplate>
  );
};

export default Transaction;
