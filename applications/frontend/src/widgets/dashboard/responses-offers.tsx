import { Heading } from '@chakra-ui/react';
import { Await, useLoaderData } from '@remix-run/react';
import { Dispatch, SetStateAction, Suspense, useState } from 'react';
import {
  ResponseOfferProvider,
  ResponseOfferRow,
} from '@/entities/responses-offers';
import { Container } from './container';
import { loader } from '../../pages/dashboard';

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
                  <ResponseOfferRow />
                </ResponseOfferProvider>
              ))
            }
          </Await>
        </Suspense>
      ))}
    </Container>
  );
}
