import { Heading } from '@chakra-ui/react';
import { AnimateLayout } from '~/routes/auth/registration/animate-layout';
import { useContext } from 'react';
import { Context } from '~/routes/auth/registration/context';
import { Field } from '~/routes/auth/registration/fields/field';

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
