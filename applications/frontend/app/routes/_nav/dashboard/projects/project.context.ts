import { createContext } from 'react';
import { ProjectDto } from '~/routes/_nav/dashboard/projects/project.dto';

export const ProjectContext = createContext<ProjectDto>({} as ProjectDto);

export const ProjectProvider = ProjectContext.Provider;
