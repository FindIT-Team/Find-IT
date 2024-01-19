import { ProjectType } from '@/lib/types/project.type';
import { UserType } from '@/lib/types/user.type';

export type ProjectsToUsersType = Partial<{
  id: string;

  isOwner: boolean;

  status: 'userInvited' | 'userRequested' | 'userJoined';

  permissions: string[];

  user: UserType;

  project: ProjectType;
}>;
