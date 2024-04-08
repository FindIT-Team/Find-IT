import { Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { AnimateLayout } from '../../../pages/auth/registration/animate-layout';
import { Context } from '../../../pages/auth/registration/context';
import { Field } from './index';

export function EmailField() {
  const { screenSearch } = useContext(Context);
  const position = screenSearch('email');

  return (
    <AnimateLayout position={position}>
      <Heading>Укажи свою почту, чтобы мы смогли связаться с тобой</Heading>
      <Field position={position} name={'user.email'} type={'email'} />
    </AnimateLayout>
  );
}
