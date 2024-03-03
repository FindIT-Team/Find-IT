import { NoticeType } from '~/types/notice.type';

export enum Subscription {
  FREE = 'FREE',
  // BASIC = 'BASIC',
  PRO = 'PRO',
  // PREMIUM = 'PREMIUM',
  // ENTERPRISE = 'ENTERPRISE',
}

export type UserType = {
  id: string;

  subscription: { type: Subscription; expiresIn: Date };

  history: { action: string; date: Date }[];

  password: string;

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

  gender: string;

  status: string;

  authLogs: {
    isLoggedIn: boolean;
    lastLogin: Date;
    history: { ip: string; strategy: string; success: boolean; date: Date }[];
  };
  notices: NoticeType[];
  userToProjects: unknown;

  updatedAt: Date;
  createdAt: Date;
};
