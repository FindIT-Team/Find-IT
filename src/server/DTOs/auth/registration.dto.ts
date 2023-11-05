export class RegistrationDto {
  user: {
    username: string;
    email: string;
    password: string;
  };

  profile: {
    name: {
      firstName: string;
      lastName: string;
    };
    skills: {
      Backend: number;
      Frontend: number;
      MachineLearning: number;
      DevOps: number;
      QA: number;
    };
    gender: 'Male' | 'Female';
  };
}
