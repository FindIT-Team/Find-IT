import { UserType } from '~/types/user.entity';
import { ProjectType } from '~/types/project.type';

export type ProjectsToUsersType = Partial<{
  id: string;

  isOwner: boolean;

  status: 'userInvited' | 'userRequested' | 'userJoined';

  permissions: string[];

  user: UserType;

  project: ProjectType;
}>;
