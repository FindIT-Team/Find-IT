import { Field } from '~/routes/auth/login/fields/field';

export function UniqField() {
  return <Field name={'uniq'} label={'Имя пользователя или почта'} />;
}
