import { OmitType, PartialType } from '@nestjs/swagger';
import { ProjectsToUsersEntity } from '../../../entities/projects-to-users.entity';

export class UpdateProjectToUserDto extends PartialType(
  OmitType(ProjectsToUsersEntity, ['id', 'user', 'project']),
) {}
