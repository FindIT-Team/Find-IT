import { z } from 'zod';

export const schema = z.object({
  uniq: z.string(),
  password: z.string(),
});

export type Schema = z.infer<typeof schema>;
