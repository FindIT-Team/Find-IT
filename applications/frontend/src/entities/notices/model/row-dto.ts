import { NoticeCategory } from '.';

export interface NoticeRowDto {
  id: string;
  message: string;
  category: NoticeCategory;
  createdAt: string;
}
