import { Container } from '~/routes/_nav/dashboard/container';
import { Await, useLoaderData } from '@remix-run/react';
import { loader } from '~/routes/_nav/dashboard/route';
import { Dispatch, SetStateAction, Suspense, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { ResponseOffer } from '~/routes/_nav/dashboard/responses-offers/response-offer';
import { ResponseOfferProvider } from '~/routes/_nav/dashboard/responses-offers/response-offer.context';

export function ResponsesOffers() {
  const { responsesOffers: initPack } = useLoaderData<typeof loader>();
  const [responsesOffers, setResponsesOffers] = useState([initPack]);

  return (
    <Container
      areaName={'responses-offers'}
      label={'Отклики и предложения'}
      setFunction={
        setResponsesOffers as Dispatch<SetStateAction<Promise<unknown[]>[]>>
      }
      array={responsesOffers}
    >
      {responsesOffers.map((pack, index) => (
        <Suspense key={index} fallback={<Heading>Skeleton need</Heading>}>
          <Await resolve={pack}>
            {(pack) =>
              pack.map((responseOffer) => (
                <ResponseOfferProvider
                  key={responseOffer.id}
                  value={responseOffer}
                >
                  <ResponseOffer />
                </ResponseOfferProvider>
              ))
            }
          </Await>
        </Suspense>
      ))}
    </Container>
  );
}
