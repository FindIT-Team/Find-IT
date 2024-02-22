import { useContext } from 'react';
import { Context } from '~/routes/auth/registration/context';
import { AnimateLayout } from '~/routes/auth/registration/animate-layout';
import { Heading } from '@chakra-ui/react';
import { Field } from '~/routes/auth/registration/fields/field';

export function PasswordField() {
  const { screenSearch } = useContext(Context);
  const position = screenSearch('password');

  return (
    <AnimateLayout position={position}>
      <Heading>И последнее... твой пароль</Heading>
      <Field position={position} name={'password'} type={'password'} />
    </AnimateLayout>
  );
}
