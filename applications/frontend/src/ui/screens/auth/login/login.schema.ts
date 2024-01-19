import { z } from 'zod';

export const loginSchema = z.object({
  uniq: z.string(),
  password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
