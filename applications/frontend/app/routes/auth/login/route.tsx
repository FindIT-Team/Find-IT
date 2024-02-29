import {
  AbsoluteCenter,
  Box,
  Center,
  chakra,
  Divider,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { PasswordField } from '~/routes/auth/login/fields/password-field';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {
  getValidatedFormData,
  RemixFormProvider,
  useRemixForm,
} from 'remix-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Schema, schema } from '~/routes/auth/login/schema';
import { getSession } from '~/session.server';
import { Form, redirect } from '@remix-run/react';
import { UniqField } from '~/routes/auth/login/fields/uniq-field';
import { fetch } from '~/fetch.util';
import { ExternalAuth } from '~/routes/auth/login/external-auth';
import { Buttons } from './buttons';

export const meta: MetaFunction = () => [{ title: 'Войти | FindIT' }];

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (session?.get('sid')) return redirect('/dashboard');

  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = (await getValidatedFormData(request, zodResolver(schema))).data;
  const session = await getSession(request.headers.get('Cookie'));

  const { headers } = await fetch('/auth/login', session, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return redirect('/dashboard', { headers });
}

export default function Page() {
  const remixForm = useRemixForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  return (
    <Center as={'main'} height={'100vh'} userSelect={'none'}>
      <HStack
        border={'1px solid'}
        borderColor={'gray.200'}
        shadow={'md'}
        background={'white'}
        borderRadius={'lg'}
        spacing={0}
        alignItems={'stretch'}
      >
        <VStack padding={12} spacing={6} flexShrink={0}>
          <ExternalAuth />
          <Box width={'full'} position={'relative'}>
            <Divider />
            <AbsoluteCenter
              px={2}
              background={'white'}
              fontSize={'md'}
              fontWeight={'semibold'}
            >
              <chakra.span opacity={0.6}>или</chakra.span>
            </AbsoluteCenter>
          </Box>
          <VStack>
            <RemixFormProvider {...remixForm}>
              <Form onSubmit={remixForm.handleSubmit}>
                <UniqField />
                <PasswordField />
                <Buttons />
              </Form>
            </RemixFormProvider>
          </VStack>
        </VStack>
        <Box
          width={[0, '30vw']}
          backgroundImage={'url(/login-side-image.jpg)'}
          backgroundSize={'cover'}
          backgroundPosition={'center center'}
          borderRightRadius={'lg'}
        />
      </HStack>
    </Center>
  );
}
