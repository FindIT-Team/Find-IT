import { Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { AnimateLayout } from '../animate-layout';
import { Context } from '../context';
import { Field } from '.';

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
