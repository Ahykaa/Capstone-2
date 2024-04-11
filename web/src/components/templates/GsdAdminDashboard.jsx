import CardItem from '@/components/organisms/Card';
import { dashboardApi } from '@/hooks/api/dashboardApi';

const GsdAdminDashboard = () => {
  const { data } = dashboardApi.useGetDashboardQuery();

  const cardData = [
    { title: data?.status_counts?.delivered ?? 0, description: 'Approved' },
    { title: data?.status_counts?.open ?? 0, description: 'Pending' },
    {
      title: data?.status_counts?.['in-transit'] ?? 0,
      description: 'Total Budget',
    },

    { title: data?.total_amount ?? 0, description: 'Total Utilized Budget' },
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
    </div>
  );
};

export default GsdAdminDashboard;
