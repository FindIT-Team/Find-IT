import { Field } from '~/routes/auth/login/fields/field';

export function PasswordField() {
  return (
    <>
      <Field name={'password'} type={'password'} label={'Пароль'} />
    </>
  );
}
