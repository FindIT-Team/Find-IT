import { UserType } from '@/lib/types/user.type';

export type NoticeType = Partial<{
  id: string;
  type: string;
  message: string;
  createdAt: Date;
  removedAt: Date;
  user: UserType;
}>;
