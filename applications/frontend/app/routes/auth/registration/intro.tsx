import { Button, Heading, HStack } from '@chakra-ui/react';
import { AnimateLayout } from '~/routes/auth/registration/animate-layout';
import { useContext } from 'react';
import { Context } from '~/routes/auth/registration/context';
import { useNavigate } from '@remix-run/react';

export function Intro() {
  const navigate = useNavigate();

  const { screenSearch, next, previous, step } = useContext(Context);

  const position = screenSearch('intro');

  return (
    <AnimateLayout
      position={position}
      vStackProps={{ spacing: 3 }}
      animateProps={{
        onExitComplete: () => step === -1 && navigate('/auth/login'),
      }}
    >
      <Heading>Давай познакомимся</Heading>
      <HStack
        width={'full'}
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
