export * from './context';
export * from './card-dto';
export * from './row-dto';

import { ProjectCardDto, ProjectRowDto } from '.';

export interface ProjectDto extends ProjectRowDto, ProjectCardDto {}
