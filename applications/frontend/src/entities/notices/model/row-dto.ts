import { NoticeCategory } from '.';

export interface NoticeRowDto {
  id: string;
  message: string;
  type: NoticeCategory;
  createdAt: string;
}
