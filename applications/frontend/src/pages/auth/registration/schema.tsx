import * as z from 'zod';
import { fetchClient } from '@/shared';

export const schema = z.object({
  user: z.object({
    username: z
      .string()
      .trim()
      .superRefine(async (val, ctx) => {
        if (val.length < 3 || val.length > 16) {
          if (val.length < 3)
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Слишком короткое имя',
              fatal: true,
            });

          if (val.length > 16)
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Слишком длинное имя',
              fatal: true,
            });

          return z.NEVER;
        }

        const isAvailable: boolean = await fetchClient(
          `auth/available-username/${val}`,
        ).then((res) => res.isAvailable);

        if (isAvailable) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Занято',
            fatal: true,
          });

          return z.NEVER;
        }
      }),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Это не похоже на адрес электронной почты'),

    password: z
      .string()
      .trim()
      .min(8, 'Слишком короткий пароль')
      .max(32, 'Слишком длинный пароль')
      .refine(
        (field) => /[a-zA-Z0-9_\-\s]/.test(field),
        'Используй только латинские буквы',
      )
      .refine(
        (field) => /[!@#$%^&*()\-+=]/.test(field),
        'Используй хотя бы один специальный символ',
      ),
  }),

  oAuth: z
    .object({
      apple: z.string().optional(),
      google: z.string().optional(),
      yandex: z.string().optional(),
      github: z.string().optional(),
    })
    .optional(),

  profile: z.object({
    name: z
      .string()
      .trim()
      .refine(
        (field) => !/[^a-zA-ZА-Яа-я0-9_\-\s]/.test(field),
        'Специальные символы не допускаются',
      ),

    gender: z.enum(['UNKNOWN', 'MALE', 'FEMALE']),
  }),

  skills: z.object({
    projectManagement: z.coerce.number(),
    backend: z.coerce.number(),
    frontend: z.coerce.number(),
    machineLearning: z.coerce.number(),
    devOps: z.coerce.number(),
    qa: z.coerce.number(),
  }),

  consent: z
    .boolean()
    .refine(
      (field) => field,
      'Мы не можем обрабатывать твои данные без согласия',
    ),
});

export type Schema = z.infer<typeof schema>;
