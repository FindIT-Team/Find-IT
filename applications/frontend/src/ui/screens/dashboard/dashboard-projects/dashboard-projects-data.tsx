import { MutableRefObject, Suspense, useRef } from 'react';
import DashboardProjectSkeleton from '@/ui/screens/dashboard/dashboard-projects/dashboard-project.skeleton';
import DashboardProject from '@/ui/screens/dashboard/dashboard-projects/dashboard-project';
import useDashboardInit from '@/lib/hooks-contexts/dashboard/use-dashboard-init';

const DashboardProjectsData = () => {
  const listRef: MutableRefObject<HTMLOListElement> =
    useRef<HTMLOListElement>(null);

  const projects = useDashboardInit(listRef, 'projects');

  return (
    projects && (
      <ol ref={listRef} className={'overflow-y-scroll'}>
        {[...projects].map((_, index) => (
          <Suspense key={index} fallback={<DashboardProjectSkeleton />}>
            <DashboardProject index={index} />
          </Suspense>
        ))}
      </ol>
    )
  );
};
export default DashboardProjectsData;
