export * from './context';

export interface UserDto {
  id: string;
  username: string;
  profile: {
    firstName: string;
    lastName: string;

    gender: string;

    skills: {
      frontend: number;
      backend: number;
      machineLearning: number;
      devOps: number;
      projectManagement: number;
      qa: number;
    };
    extraSkills: { name: string; value: number; updatedAt: string }[];

    contacts: {
      telegram?: string;
      email?: string;
      phone?: string;
    };
    extraContacts: { name: string; value: string; link?: string }[];
  };

  projects: {
    isOwner: boolean;
    project: {
      title: string;
      description: string;
      slug: string;
      budget: number;
      rating: { mark: number }[];
      _count: { users: number };
    };
  }[];
}
