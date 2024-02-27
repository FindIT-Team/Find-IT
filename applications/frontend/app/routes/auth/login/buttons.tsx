import { Button, HStack } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

export function Buttons() {
  return (
    <HStack
      width={'full'}
      justifyContent={'space-between'}
      flexDirection={'row-reverse'}
    >
      <Button colorScheme={'blue'} type={'submit'} flexGrow={1}>
        Войти
      </Button>
      <Button as={Link} to={'/auth/registration'}>
        Регистрация
      </Button>
    </HStack>
  );
}
