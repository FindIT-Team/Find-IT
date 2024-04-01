import { createContext } from 'react';
import { NoticeDto } from './notice.dto';

export const NoticeContext = createContext<NoticeDto>({} as NoticeDto);

export const NoticeProvider = NoticeContext.Provider;
