import { createContext } from 'react';
import { ProjectDto } from '.';

export const ProjectContext = createContext<ProjectDto>({} as ProjectDto);

export const ProjectProvider = ProjectContext.Provider;
