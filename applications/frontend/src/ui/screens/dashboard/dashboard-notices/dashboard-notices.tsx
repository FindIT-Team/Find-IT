import styles from '../dashboard-content.module.scss';
import DashboardNoticesData from '@/ui/screens/dashboard/dashboard-notices/dashboard-notices-data';
import { Suspense } from 'react';
import DashboardDataSkeleton from '@/ui/screens/dashboard/dashboard-data-skeleton';
import DashboardNoticeSkeleton from '@/ui/screens/dashboard/dashboard-notices/dashboard-notice.skeleton';

const DashboardNotices = () => {
  return (
    <div className={styles.container}>
      <h2>Уведомления</h2>
      <Suspense
        fallback={
          <DashboardDataSkeleton>
            <DashboardNoticeSkeleton />
          </DashboardDataSkeleton>
        }
      >
        <DashboardNoticesData />
      </Suspense>
    </div>
  );
};
export default DashboardNotices;
