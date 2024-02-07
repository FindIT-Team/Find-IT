import { PickType } from '@nestjs/swagger';
import { ProjectEntity } from '../../../entities/project.entity';

export class CreateProjectDto extends PickType(ProjectEntity, [
  'title',
  'description',
  'employersNeeds',
  'budget',
]) {}
