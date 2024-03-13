import * as z from 'zod';

export const schema = z.object({
  user: z.object({
    username: z
      .string()
      .trim()
      .min(3, 'Слишком короткое имя')
      .max(15, 'Слишком длинное имя'),
    // TODO: Wait for bugfix on React-Hook-Form dependency to use async validations
    // .refine(
    //   (field) =>
    //     fetch(
    //       new URL(
    //         `/auth/available-username/${field}`,
    //         'http://api.findit.test',
    //       ),
    //     )
    //       .then((res) => res.json())
    //       .then(({ isAvailable }) => !isAvailable),
    //   'Занято',
    // ),

    email: z.string().trim().email('Это не похоже на адрес электронной почты'),

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
      'К сожалению, мы не можем обрабатывать твои данные без согласия',
    ),
});

export type Schema = z.infer<typeof schema>;
