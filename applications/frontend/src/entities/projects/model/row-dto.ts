export interface ProjectRowDto {
  id: string;
  title: string;
  description: string;
  slug: string;
  budget?: { currency: string; value: number };

  rating: [{ mark: number }];
  users: [
    {
      user: {
        username: string;
      };
    },
  ];
  _count: { users: number };

  updatedAt: string;
}
