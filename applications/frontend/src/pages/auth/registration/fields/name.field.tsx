import { Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { AnimateLayout } from '../animate-layout';
import { Context } from '../context';
import { Field } from '.';

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
