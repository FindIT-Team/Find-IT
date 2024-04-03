export interface ResponseOfferRowDto {
  id: string;

  project: {
    title: string;
    description: string;
    slug: string;
    budget: { currency: string; value: number };
    users: [{ user: { username: string } }];
    _count: { users: number };
    rating: { mark: number }[];
  };
  status: {};
}
