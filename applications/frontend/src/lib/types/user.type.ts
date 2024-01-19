import { ProjectsToUsersType } from '@/lib/types/projects-to-users.type';

export type UserType = Partial<{
  id: string;
  subscription: { type: string; expiresIn: Date };
  history: { action: string; date: Date }[];
  notices: { type: string; message: string; date: Date }[];
  username: string;
  email: string;
  role: string;
  linkedOAuth: {
    apple: unknown;
    google: unknown;
    yandex: unknown;
    github: unknown;
  };
  name: {
    firstName: string;
    lastName: string;
  };
  skills: {
    ProjectManagement: number;
    Backend: number;
    Frontend: number;
    MachineLearning: number;
    DevOps: number;
    QA: number;
  };
  socialLinks: { github: string };
  photo: string;
  gender: 'Male' | 'Female';
  status: string;
  authLogs: {
    isLoggedIn: boolean;
    lastLogin: Date;
    history: { ip: string; strategy: string; success: boolean; date: Date }[];
  };
  userToProjects: ProjectsToUsersType[];
  updatedAt: Date;
  createdAt: Date;
}>;
