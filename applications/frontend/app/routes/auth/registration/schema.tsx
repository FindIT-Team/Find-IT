import * as z from 'zod';
import { fetch } from '~/.client/fetch';

export const schema = z.object({
  user: z.object({
    username: z
      .string()
      .trim()
      .min(3, 'Слишком короткое имя')
      .max(15, 'Слишком длинное имя')
      .refine(
        (field) =>
          field !== '' &&
          fetch(`/auth/available-username/${field}`).then(
            ({ isAvailable }) => !isAvailable,
          ),
        'Занято',
      ),

    email: z.string().trim().email('Это не похоже на адрес электронной почты'),

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
