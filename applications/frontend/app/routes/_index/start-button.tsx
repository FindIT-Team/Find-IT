import { Link } from '~/components/link';
import { Button, chakra, HStack } from '@chakra-ui/react';
import { useNavigate } from '@remix-run/react';

export function StartButton() {
  const navigate = useNavigate();

  return (
    <>
      <chakra.div display={'none'}>
        <Link prefetch={'render'} to={'/auth/login'} />
      </chakra.div>
      <HStack
        justifyContent={['center', 'center', 'flex-start', 'flex-start']}
        flexDirection={['column', 'column', 'row', 'row']}
        gap={1}
        width={'100%'}
      >
        <Button
          colorScheme={'purple'}
          borderRadius={'lg'}
          width={['100%', '100%', 'auto', 'auto']}
          onClick={() => navigate('/auth/login')}
        >
          Начать
        </Button>
        <HStack opacity={'70%'} gap={1} flexWrap={'wrap'}>
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
      </HStack>
    </>
  );
}
