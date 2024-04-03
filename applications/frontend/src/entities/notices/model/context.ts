import { createContext } from 'react';
import { NoticeDto } from '.';

export const NoticeContext = createContext<NoticeDto>({} as NoticeDto);

export const NoticeProvider = NoticeContext.Provider;
