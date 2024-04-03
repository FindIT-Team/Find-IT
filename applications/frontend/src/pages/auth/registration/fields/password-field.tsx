import { Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { AnimateLayout } from '../animate-layout';
import { Context } from '../context';
import { Field } from '.';

export function PasswordField() {
  const { screenSearch } = useContext(Context);
  const position = screenSearch('password');

  return (
    <AnimateLayout position={position}>
      <Heading>И последнее... твой пароль</Heading>
      <Field position={position} name={'user.password'} type={'password'} />
    </AnimateLayout>
  );
}
