import { Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { AnimateLayout } from '../animate-layout';
import { Context } from '../context';
import { Field } from '.';

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
