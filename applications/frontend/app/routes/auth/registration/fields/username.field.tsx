import { Heading } from '@chakra-ui/react';
import { AnimateLayout } from '~/routes/auth/registration/animate-layout';
import { useContext } from 'react';
import { Context } from '~/routes/auth/registration/context';
import { Field } from '~/routes/auth/registration/fields/field';

export function UsernameField() {
  const { screenSearch } = useContext(Context);
  const position = screenSearch('username');

  return (
    <AnimateLayout position={position}>
      <Heading>Давай определимся с публичным именем</Heading>
      <Field position={position} name={'user.username'} />
    </AnimateLayout>
  );
}
