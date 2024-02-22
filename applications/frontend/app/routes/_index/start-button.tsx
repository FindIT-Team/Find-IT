import { Button, chakra, Flex } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

export function StartButton() {
  const navigate = useNavigate();

  return (
    <Flex
      justifyContent={['center', 'center', 'flex-start', 'flex-start']}
      flexDirection={['column', 'column', 'row', 'row']}
      gap={1}
      width={'100%'}
    >
      <Button
        as={Link}
        to={'/auth/login'}
        colorScheme={'purple'}
        borderRadius={'lg'}
        onClick={() => navigate('/auth/login')}
        width={['100%', '100%', 'auto', 'auto']}
      >
        Начать
      </Button>
      <Button
        as={Link}
        variant={'link'}
        opacity={'70%'}
        flexWrap={'wrap'}
        gap={1}
        justifyContent={'flex-start'}
        _hover={{ textDecoration: 'none' }}
        to={'/help/faq'}
      >
        Нужна помощь?{' '}
        <chakra.span color={'green.500'} _hover={{ color: 'green.600' }}>
          Посмотрите FAQ
        </chakra.span>
      </Button>
    </Flex>
  );
}
