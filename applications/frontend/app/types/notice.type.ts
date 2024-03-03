import { UserType } from '~/types/user.entity';

export type NoticeType = Partial<{
  id: string;

  type: string;
  message: string;

  createdAt: Date;

  removedAt: Date;

  user: UserType;
}>;
