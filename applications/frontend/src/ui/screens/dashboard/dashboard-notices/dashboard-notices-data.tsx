import { MutableRefObject, Suspense, useRef } from 'react';
import useDashboardInit from '@/lib/hooks-contexts/dashboard/use-dashboard-init';
import DashboardNoticeSkeleton from '@/ui/screens/dashboard/dashboard-notices/dashboard-notice.skeleton';
import DashboardNotice from '@/ui/screens/dashboard/dashboard-notices/dashboard-notice';

const DashboardNoticesData = () => {
  const listRef: MutableRefObject<HTMLOListElement> =
    useRef<HTMLOListElement>(null);

  const notices = useDashboardInit(listRef, 'notices');

  return (
    notices && (
      <ol ref={listRef} className={'overflow-y-scroll'}>
        {[...notices].map((_, index) => (
          <Suspense key={index} fallback={<DashboardNoticeSkeleton />}>
            <DashboardNotice index={index} />
          </Suspense>
        ))}
      </ol>
    )
  );
};
export default DashboardNoticesData;
