import * as z from 'zod';

export const schema = z.object({
  username: z
    .string()
    .min(3, 'Слишком короткое имя')
    .max(15, 'Слишком длинное имя')
    .transform((field) => field.trim())
    .refine((field) => !/\s/.test(field), 'Пробелы недопускаются')
    .refine(
      (field) => !/[^a-zA-Z0-9_\-\s]/.test(field),
      'Специальные символы недопускаются',
    ),

  email: z.string().email('Это не похоже на адрес электронной почты'),

  password: z
    .string()
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

  linkedAccounts: z
    .object({
      apple: z.string().optional(),
      google: z.string().optional(),
      yandex: z.string().optional(),
      github: z.string().optional(),
    })
    .optional(),

  name: z
    .string()
    .refine(
      (field) => !/[^a-zA-ZА-Яа-я0-9_\-\s]/.test(field),
      'Специальные символы не допускаются',
    )
    .refine((field) => field.split(' ').length === 2, 'Укажи имя и фамилию'),

  skills: z.object({
    ProjectManagement: z.coerce.number(),
    Backend: z.coerce.number(),
    Frontend: z.coerce.number(),
    MachineLearning: z.coerce.number(),
    DevOps: z.coerce.number(),
    QA: z.coerce.number(),
  }),

  gender: z.enum(['Male', 'Female']),

  consent: z
    .boolean()
    .refine(
      (field) => field,
      'К сожалению, мы не можем обрабатывать твои данные без согласия',
    ),
});

export type Schema = z.infer<typeof schema>;
