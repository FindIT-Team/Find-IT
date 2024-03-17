import { Container } from '~/routes/_nav/dashboard/container';
import { Await, useLoaderData } from '@remix-run/react';
import { loader } from '~/routes/_nav/dashboard/route';
import { Suspense, useState } from 'react';
import { Heading } from '@chakra-ui/react';

export function ResponsesOffers() {
  const { responsesOffers: initPack } = useLoaderData<typeof loader>();
  const [responsesOffers, setResponsesOffers] = useState([initPack]);

  return (
    <Container
      areaName={'responses-offers'}
      label={'Отклики и предложения'}
      setFunction={setResponsesOffers}
      array={responsesOffers}
    >
      {responsesOffers.map((pack, index) => (
        <Suspense key={index} fallback={<Heading>Skeleton need</Heading>}>
          <Await resolve={pack}>
            {(pack) =>
              pack.map((responseOffer: ResponseOfferType, index: number) => (
                <ResponseOffer
                  key={responseOffer.id}
                  responseOffer={responseOffer}
                />
              ))
            }
          </Await>
        </Suspense>
      ))}
    </Container>
  );
}
