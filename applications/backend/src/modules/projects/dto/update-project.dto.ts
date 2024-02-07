import { OmitType, PartialType } from '@nestjs/swagger';
import { ProjectEntity } from '../../../entities/project.entity';

export class UpdateProjectDto extends PartialType(
  OmitType(ProjectEntity, ['id', 'projectToUsers', 'createdAt']),
) {}
