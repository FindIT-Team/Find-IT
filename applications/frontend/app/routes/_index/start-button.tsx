import { Link } from '~/components/link';
import { Button, chakra, Flex } from '@chakra-ui/react';

export function StartButton() {
  return (
    <Flex
      justifyContent={['center', 'center', 'flex-start', 'flex-start']}
      flexDirection={['column', 'column', 'row', 'row']}
      gap={1}
      width={'100%'}
    >
      <Button colorScheme={'purple'} borderRadius={'lg'}>
        <Link
          _hover={{ textDecoration: 'none' }}
          to={'/auth/login'}
          prefetch={'render'}
        >
          Начать
        </Link>
      </Button>
      <Button
        variant={'link'}
        colorScheme={'white'}
        opacity={'70%'}
        _hover={{ textDecoration: 'none' }}
      >
        <Link
          to={'/help/faq'}
          _hover={{ textDecoration: 'none' }}
          display={'flex'}
          flexWrap={'wrap'}
          gap={1}
        >
          Нужна помощь?{' '}
          <chakra.span color={'green.500'} _hover={{ color: 'green.600' }}>
            Посмотрите FAQ
          </chakra.span>
        </Link>
      </Button>
    </Flex>
  );
}
