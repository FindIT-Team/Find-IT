import { Button, chakra, Flex } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

export function StartButton() {
  return (
    <Flex
      justifyContent={['center', 'center', 'flex-start', 'flex-start']}
      flexDirection={['column', 'column', 'row', 'row']}
      gap={1}
      width={'100%'}
      userSelect={'auto'}
    >
      <Button
        as={Link}
        to={'/auth/login'}
        colorScheme={'purple'}
        borderRadius={'lg'}
      >
        Начать
      </Button>
      <Button
        as={Link}
        variant={'link'}
        colorScheme={'white'}
        opacity={'70%'}
        _hover={{ textDecoration: 'none' }}
        to={'/help/faq'}
        flexWrap={'wrap'}
        gap={1}
        justifyContent={'flex-start'}
      >
        Нужна помощь?{' '}
        <chakra.span color={'green.500'} _hover={{ color: 'green.600' }}>
          Посмотрите FAQ
        </chakra.span>
      </Button>
    </Flex>
  );
}
