import { FaRegChartBar } from 'react-icons/fa'

import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/Template'

import SuperAdminDasboard from '@/components/templates/SuperAdminDashboard'
import { useUser } from '@/hooks/redux/auth'
import TemplateGSD from '@/components/templates/TemplateGSD'
import GsdAdminDashboard from '@/components/templates/GsdAdminDashboard'
import StaffDashboard from '@/components/templates/StaffDashboard'
import TemplateStaff from '@/components/templates/TemplateStaff'

const Dashboard = () => {
  const { user } = useUser()

  const breadcrumbs = [
    {
      href: '#',
      title: 'Dashboard',
      icon: FaRegChartBar,
    },
  ]

  return (
    <div>
      {user.role === 'superadmin' ?
        <Template>
          <PageHeader breadcrumbs={breadcrumbs} />
          <SuperAdminDasboard />
        </Template>
      : user.role === 'subadmin' ?
        <TemplateGSD>
          <PageHeader breadcrumbs={breadcrumbs} />
          <GsdAdminDashboard />
        </TemplateGSD>
      : user.role === 'admin' ?
        <TemplateStaff>
          <PageHeader breadcrumbs={breadcrumbs} />
          <StaffDashboard />
        </TemplateStaff>
      : <TemplateStaff>
          <PageHeader breadcrumbs={breadcrumbs} />
          <StaffDashboard />
        </TemplateStaff>
      }
    </div>
  )
}

export default Dashboard
