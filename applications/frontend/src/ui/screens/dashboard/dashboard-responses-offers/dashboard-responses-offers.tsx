import styles from '@/ui/screens/dashboard/dashboard-content.module.scss';
import DashboardResponsesOffersData from '@/ui/screens/dashboard/dashboard-responses-offers/dashboard-responses-offers-data';
import { Suspense } from 'react';
import DashboardDataSkeleton from '@/ui/screens/dashboard/dashboard-data-skeleton';
import DashboardResponseOfferSkeleton from '@/ui/screens/dashboard/dashboard-responses-offers/dashboard-response-offer.skeleton';

const DashboardResponsesOffers = () => {
  return (
    <div className={styles.container}>
      <h2>Отклики и предложения</h2>
      <Suspense
        fallback={
          <DashboardDataSkeleton>
            <DashboardResponseOfferSkeleton />
          </DashboardDataSkeleton>
        }
      >
        <DashboardResponsesOffersData />
      </Suspense>
    </div>
  );
};
export default DashboardResponsesOffers;
