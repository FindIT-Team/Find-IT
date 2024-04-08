import { Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { AnimateLayout } from '../../../pages/auth/registration/animate-layout';
import { Context } from '../../../pages/auth/registration/context';
import { Field } from './index';

export function NameField() {
  const { screenSearch } = useContext(Context);
  const position = screenSearch('name');

  return (
    <AnimateLayout position={position}>
      <Heading>А что насчет настоящего имени?</Heading>
      <Field position={position} name={'profile.name'} />
    </AnimateLayout>
  );
}
