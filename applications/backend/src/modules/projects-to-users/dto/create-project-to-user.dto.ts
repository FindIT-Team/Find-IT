import { ProjectsToUsersEntity } from '../../../entities/projects-to-users.entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

export class CreateProjectToUserDto extends IntersectionType(
  PickType(ProjectsToUsersEntity, ['status', 'permissions']),
  PartialType(PickType(ProjectsToUsersEntity, ['isOwner'])),
) {}
