export class ProjectDto {
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

  constructor(
    id: string,
    title: string,
    description: string,
    slug: string,
    rating: [{ mark: number }],
    users: [
      {
        user: {
          username: string;
        };
      },
    ],
    _count: { users: number },
    updatedAt: string,
    budget?: { currency: string; value: number },
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.slug = slug;
    this.budget = budget;
    this.rating = rating;
    this.users = users;
    this._count = _count;
    this.updatedAt = updatedAt;
  }
}
