export type ProjectType = Partial<{
  id: string;

  title: string;

  description: string;

  employersNeeds: {
    ProjectManagement: number;
    Backend: number;
    Frontend: number;
    MachineLearning: number;
    DevOps: number;
    QA: number;
  };

  budget: string;

  updatedAt: Date;

  createdAt: Date;

  history: { action: string; date: Date }[];
}>;
