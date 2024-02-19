import { Link } from '~/components/link';
import { Button, chakra, HStack } from '@chakra-ui/react';

export function StartButton() {
  return (
    <HStack
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
      <HStack opacity={'70%'} flexWrap={'wrap'} gap={1}>
        <chakra.div>Нужна помощь?</chakra.div>
        <Link
          fontWeight={'bold'}
          color={'green.500'}
          _hover={{ color: 'green.600' }}
          to={'/help/faq'}
        >
          Посмотрите FAQ
        </Link>
      </HStack>
      {/*<Button*/}
      {/*  variant={'link'}*/}
      {/*  colorScheme={'white'}*/}
      {/*  opacity={'70%'}*/}
      {/*  _hover={{ textDecoration: 'none' }}*/}
      {/*>*/}
      {/*  <Link*/}
      {/*    to={'/help/faq'}*/}
      {/*    _hover={{ textDecoration: 'none' }}*/}
      {/*    display={'flex'}*/}
      {/*    flexWrap={'wrap'}*/}
      {/*    gap={1}*/}
      {/*  ></Link>*/}
      {/*</Button>*/}
    </HStack>
  );
}
