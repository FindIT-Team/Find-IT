import styles from '@/ui/screens/dashboard/dashboard-content.module.scss';
import DashboardSubscriptionData from '@/ui/screens/dashboard/dashboard-subscription/dashboard-subscription-data';
import { Suspense } from 'react';

const DashboardSubscription = () => {
  return (
    <div className={styles.container}>
      <h2>Подписка</h2>
      <Suspense fallback={<></>}>
        <DashboardSubscriptionData />
      </Suspense>
    </div>
  );
};
export default DashboardSubscription;
