import { FaRegChartBar } from 'react-icons/fa';

// import CardItem from '@/components/organisms/Card';

import PageHeader from '@/components/organisms/PageHeader';
import Template from '@/components/templates/Template';

import SuperAdminDasboard from '@/components/templates/SuperAdminDashboard';
import { useUser } from '@/hooks/redux/auth';
// import StaffDashboard from '@/components/templates/StaffDashboard';
import TemplateGSD from '@/components/templates/TemplateGSD';
import GsdAdminDashboard from '@/components/templates/GsdAdminDashboard';
import StaffDashboard from '@/components/templates/StaffDashboard';

const Dashboard = () => {
  const { user } = useUser();

  const breadcrumbs = [
    {
      href: '#',
      title: 'Dashboard',
      icon: FaRegChartBar,
    },
  ];

  return (
    <div>
      {user.role === 'admin' ? (
        <Template>
          <PageHeader breadcrumbs={breadcrumbs} />
          <SuperAdminDasboard />
        </Template>
      ) : user.role === 'subadmin' ? (
        <TemplateGSD>
          <PageHeader breadcrumbs={breadcrumbs} />
          <GsdAdminDashboard />
        </TemplateGSD>
      ) : (
        <Template>
          <PageHeader breadcrumbs={breadcrumbs} />
          <StaffDashboard />
        </Template>
      )}
    </div>
  );
};

export default Dashboard;
