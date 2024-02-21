import { Link } from '~/components/link';
import { ActionFunctionArgs } from '@remix-run/node';
import {
  getValidatedFormData,
  RemixFormProvider,
  useRemixForm,
} from 'remix-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Schema, schema } from '~/routes/auth/login/shema';
import { Form, redirect } from '@remix-run/react';
import { fetch } from '~/fetch.util';
import { getSession } from '~/session.server';
import {
  Button,
  Center,
  chakra,
  Divider,
  Heading,
  HStack,
  Image,
  VStack,
} from '@chakra-ui/react';
import { UniqField } from '~/routes/auth/login/fields/uniq-field';
import { PasswordField } from '~/routes/auth/login/fields/password-field';
import { externalAuth } from '~/routes/auth/login/url';

export async function action({ request }: ActionFunctionArgs) {
  const data = (await getValidatedFormData(request, zodResolver(schema))).data;
  const session = await getSession(request.headers.get('Cookie'));
  const { headers } = await fetch(
    session,
    `http://api.${process.env.DOMAIN}/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return redirect('/dashboard', { headers });
}

export default function Page() {
  const remixForm = useRemixForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  return (
    <Center as={'main'} h={'100vh'} background={'gray.200'} userSelect={'none'}>
      <RemixFormProvider {...remixForm}>
        <Form onSubmit={remixForm.handleSubmit}>
          <HStack
            border={'1px solid gray.100'}
            background={'white'}
            borderRadius={'lg'}
            spacing={0}
            wrap={'nowrap'}
          >
            <VStack padding={12} spacing={12} flexShrink={0}>
              <VStack>
                <Heading fontSize={'2xl'}>Войти с помощью</Heading>
                <HStack>
                  {externalAuth.map(({ id, url, img }) => (
                    <Button key={id} p={2}>
                      <Link to={url} w={8} h={8}>
                        <Image src={img} alt={id} w={'full'} h={'full'} />
                      </Link>
                    </Button>
                  ))}
                </HStack>
              </VStack>
              <Center width={'full'}>
                <Divider />
                <chakra.span
                  position={'absolute'}
                  px={2}
                  background={'white'}
                  fontSize={'lg'}
                >
                  или
                </chakra.span>
              </Center>
              <VStack>
                <UniqField />
                <PasswordField />
                <HStack>
                  <Button colorScheme={'blue'} type={'submit'}>
                    Войти
                  </Button>
                  <Button>
                    <Link
                      _hover={{ textDecorator: 'none' }}
                      to={'/auth/registration'}
                    >
                      Регистрация
                    </Link>
                  </Button>
                </HStack>
              </VStack>
            </VStack>
            <Image
              src={'/login-side-image.jpg'}
              display={'block'}
              objectFit={'cover'}
              aspectRatio={'1/2'}
              objectPosition={'center center'}
              maxWidth={'400px'}
              height={'40%'}
            />
          </HStack>
        </Form>
      </RemixFormProvider>
    </Center>
  );
}
