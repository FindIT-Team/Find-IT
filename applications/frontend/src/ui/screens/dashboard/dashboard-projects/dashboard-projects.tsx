import styles from '@/ui/screens/dashboard/dashboard-content.module.scss';
import DashboardProjectsData from '@/ui/screens/dashboard/dashboard-projects/dashboard-projects-data';
import { Suspense } from 'react';
import DashboardDataSkeleton from '@/ui/screens/dashboard/dashboard-data-skeleton';
import DashboardProjectSkeleton from '@/ui/screens/dashboard/dashboard-projects/dashboard-project.skeleton';

const DashboardProjects = () => {
  return (
    <div className={styles.container}>
      <h2>Мои проекты</h2>
      <Suspense
        fallback={
          <DashboardDataSkeleton>
            <DashboardProjectSkeleton />
          </DashboardDataSkeleton>
        }
      >
        <DashboardProjectsData />
      </Suspense>
    </div>
  );
};
export default DashboardProjects;
