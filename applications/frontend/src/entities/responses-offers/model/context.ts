import { createContext } from 'react';
import { ResponseOfferDto } from '.';

export const ResponseOfferContext = createContext<ResponseOfferDto>(
  {} as ResponseOfferDto,
);

export const ResponseOfferProvider = ResponseOfferContext.Provider;
