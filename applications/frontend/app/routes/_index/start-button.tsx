import { Button, chakra, Stack } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

export function StartButton() {
  return (
    <Stack
      justifyContent={['center', 'center', 'flex-start', 'flex-start']}
      alignItems={'center'}
      flexDirection={['column', 'column', 'row', 'row']}
      gap={2}
      width={'full'}
    >
      <Button
        as={Link}
        colorScheme={'purple'}
        borderRadius={'lg'}
        width={['full', 'full', 'auto', 'auto']}
        to={'/auth/login'}
      >
        Начать
      </Button>
      <Button
        as={Link}
        variant={'link'}
        opacity={0.7}
        flexWrap={'wrap'}
        gap={1}
        justifyContent={'flex-start'}
        role={'group'}
        _hover={{ textDecoration: 'none' }}
        to={'/help/faq'}
      >
        Нужна помощь?{' '}
        <chakra.span color={'green.500'} _groupHover={{ color: 'green.600' }}>
          Посмотрите FAQ
        </chakra.span>
      </Button>
    </Stack>
  );
}
