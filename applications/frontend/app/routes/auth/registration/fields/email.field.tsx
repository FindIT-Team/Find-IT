import { Heading } from '@chakra-ui/react';
import { AnimateLayout } from '~/routes/auth/registration/animate-layout';
import { Context } from '~/routes/auth/registration/context';
import { useContext } from 'react';
import { Field } from '~/routes/auth/registration/fields/field';

export function EmailField() {
  const { screenSearch } = useContext(Context);
  const position = screenSearch('email');

  return (
    <AnimateLayout position={position}>
      <Heading>Укажи свою почту, чтобы мы смогли связаться с тобой</Heading>
      <Field position={position} name={'email'} type={'email'} />
    </AnimateLayout>
  );
}
