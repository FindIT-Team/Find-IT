import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Schema, schema } from '~/routes/auth/login/shema';
import { useRemixForm } from 'remix-hook-form';
import { Form as RemixForm } from '@remix-run/react';

export function Form() {
  const remixForm = useRemixForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
  });
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <RemixForm onSubmit={remixForm.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="email">Почта</FormLabel>
              <Input
                {...remixForm.register('uniq')}
                variant="filled"
                background={'gray.200'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <Input
                {...remixForm.register('password')}
                type="password"
                background={'gray.200'}
                variant="filled"
              />
            </FormControl>
            <Checkbox id="rememberMe" name="rememberMe" color={'black'}>
              Запомнить меня?
            </Checkbox>
            <Button
              type="submit"
              background={'indigo.600'}
              color={'white'}
              _hover={{ background: 'indigo.700' }}
              width="full"
            >
              Войти
            </Button>
          </VStack>
        </RemixForm>
      </Box>
    </Flex>
  );
}
