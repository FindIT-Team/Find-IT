import React, { createContext, useContext, useState } from 'react';
import { NoticeType } from '../types/notice.type';
import { ProjectType } from '../types/project.type';
import { UserType } from '../types/user.type';
import { useUser } from './user.context';

type DashboardContextType = {
  user: UserType;
  notices: NoticeType[];
  setNotices: React.Dispatch<React.SetStateAction<NoticeType[]>>;
  projects: ProjectType[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  responsesOffers: ProjectType[];
  setResponsesOffers: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  subscription: { type: string; expiresIn: Date };
};

const DashboardContext = createContext<DashboardContextType>(null);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [responsesOffers, setResponsesOffers] = useState<ProjectType[]>([]);

  const user = useUser();

  const context: DashboardContextType = {
    user,
    notices,
    setNotices,
    projects,
    setProjects,
    responsesOffers,
    setResponsesOffers,
    subscription: user?.subscription,
  };

  return (
    <DashboardContext.Provider value={context}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
