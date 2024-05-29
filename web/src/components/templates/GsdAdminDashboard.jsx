import CardItem from '@/components/organisms/Card';
import { dashboardApi } from '@/hooks/api/dashboardApi';
import CalendarScheduler from '../organisms/CalendarScheduler';
import { useDepartments } from '@/hooks/redux/useDepartments';
import { useUser } from '@/hooks/redux/auth';
import { formatAsMoney } from '@/hooks/lib/util';

const GsdAdminDashboard = () => {
  const { data } = dashboardApi.useGetDashboardQuery();
  const { departments } = useDepartments();
  const { user } = useUser();

  const userDepartment = departments.find(
    (dept) => dept.id === user.department_id
  );

  const cardData = [
    { title: data?.status_counts?.delivered ?? 0, description: 'Approved' },
    { title: data?.status_counts?.open ?? 0, description: 'Pending' },
    { title: formatAsMoney(userDepartment?.budget ?? 0), description: 'Total Budget' },
    { title: formatAsMoney(userDepartment?.budget ?? 0), description: 'Total Utilized Budget' },

  ];

  const events = [
    // Sample events data
    {
      title: 'Orientation',
      start: '2024-05-17T09:00:00',
    },
    {
      title: 'Pictorial',
      start: '2024-05-20T18:00:00',
    },
  ];

  return (
    <div className='mx-auto max-w-screen-lg mt-12'>
      <div className='grid grid-cols-4 gap-4'>
        {cardData.map((card, index) => (
          <CardItem
            key={index}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
      <div className='grid grid-cols-2 gap-4 w-full'>
        <div className='mt-8 w-full'>
          <CalendarScheduler events={events} />
        </div>
      </div>
    </div>
  );
};

export default GsdAdminDashboard;
