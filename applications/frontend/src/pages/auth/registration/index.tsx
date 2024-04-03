import { Box } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form, redirect } from '@remix-run/react';
import {
  parseFormData,
  RemixFormProvider,
  useRemixForm,
} from 'remix-hook-form';
import { fetchServer } from '@/shared';
import { ContextProvider } from './context';
import {
  EmailField,
  GenderField,
  NameField,
  PasswordField,
  SkillsField,
  UsernameField,
} from './fields';
import { Intro } from './intro';
import { Outro } from './outro';
import { Schema, schema } from './schema';

export const meta: MetaFunction = () => [{ title: 'Регистрация | FindIT' }];

export async function action({ request }: ActionFunctionArgs) {
  const cookie = request.headers.get('Cookie');

  const data = (await parseFormData(request)) as Schema;
  Object.assign(data?.profile, {
    firstName: data?.profile.name.split(' ')[0],
    lastName: data?.profile.name.split(' ')[1],
  });
  delete (data?.profile as { name?: string }).name;

  const { headers } = await fetchServer('/auth/registration', cookie, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return redirect('/auth/login', { headers });
}

export default function Page() {
  const remixForm = useRemixForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      skills: {
        projectManagement: 0,
        frontend: 0,
        backend: 0,
        machineLearning: 0,
        devOps: 0,
        qa: 0,
      },
    },
  });

  return (
    <Box
      as={'main'}
      userSelect={'none'}
      width={'100vw'}
      height={'100vh'}
      overflow={'hidden'}
    >
      <RemixFormProvider {...remixForm}>
        <Form onSubmit={remixForm.handleSubmit}>
          <ContextProvider>
            <Intro />
            <UsernameField />
            <NameField />
            <EmailField />
            <SkillsField />
            <GenderField />
            <PasswordField />
            <Outro />
          </ContextProvider>
        </Form>
      </RemixFormProvider>
    </Box>
  );
}
