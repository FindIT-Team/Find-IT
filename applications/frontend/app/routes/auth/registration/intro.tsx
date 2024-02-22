import { Button, Heading, HStack } from '@chakra-ui/react';
import { AnimateLayout } from '~/routes/auth/registration/animate-layout';
import { useContext } from 'react';
import { Context } from '~/routes/auth/registration/context';

export function Intro() {
  const { screenSearch, next, previous } = useContext(Context);
  const position = screenSearch('intro');

  return (
    <AnimateLayout position={position} vStackProps={{ spacing: 3 }}>
      <Heading>Давай познакомимся</Heading>
      <HStack
        width={'100%'}
        flexDirection={['column', 'column', 'row-reverse', 'row-reverse']}
        justifyContent={'space-between'}
        alignItems={'stretch'}
      >
        <Button
          flexGrow={1}
          colorScheme={'blue'}
          type={'button'}
          onClick={() => next(position + 1)}
        >
          Продолжить
        </Button>
        <Button type={'button'} onClick={() => previous(position - 1)}>
          Назад
        </Button>
      </HStack>
    </AnimateLayout>
  );
}
