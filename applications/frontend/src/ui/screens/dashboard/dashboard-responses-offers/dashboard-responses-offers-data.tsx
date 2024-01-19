import { MutableRefObject, Suspense, useRef } from 'react';
import DashboardResponseOfferSkeleton from '@/ui/screens/dashboard/dashboard-responses-offers/dashboard-response-offer.skeleton';
import DashboardResponseOffer from '@/ui/screens/dashboard/dashboard-responses-offers/dashboard-response-offer';
import useDashboardInit from '@/lib/hooks-contexts/dashboard/use-dashboard-init';

const DashboardResponsesOffersData = () => {
  const listRef: MutableRefObject<HTMLOListElement> =
    useRef<HTMLOListElement>(null);

  const responsesOffers = useDashboardInit(listRef, 'responses-offers');

  return (
    responsesOffers && (
      <ol ref={listRef} className={'overflow-y-scroll'}>
        {[...responsesOffers].map((_, index) => (
          <Suspense key={index} fallback={<DashboardResponseOfferSkeleton />}>
            <DashboardResponseOffer index={index} />
          </Suspense>
        ))}
      </ol>
    )
  );
};
export default DashboardResponsesOffersData;
