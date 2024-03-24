import { createContext } from 'react';
import { ResponseOfferDto } from '~/routes/_nav/dashboard/responses-offers/response-offer.dto';

export const ResponseOfferContext = createContext<ResponseOfferDto>(
  {} as ResponseOfferDto,
);

export const ResponseOfferProvider = ResponseOfferContext.Provider;
