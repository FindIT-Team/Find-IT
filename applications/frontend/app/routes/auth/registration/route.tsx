import { UsernameField } from '~/routes/auth/registration/fields/username.field';
import { NameField } from '~/routes/auth/registration/fields/name.field';
import { EmailField } from '~/routes/auth/registration/fields/email.field';
import { Intro } from '~/routes/auth/registration/intro';
import { ContextProvider } from '~/routes/auth/registration/context';
import { SkillsField } from '~/routes/auth/registration/fields/skills.field';
import { GenderField } from '~/routes/auth/registration/fields/gender-field';
import { PasswordField } from '~/routes/auth/registration/fields/password-field';
import { Outro } from '~/routes/auth/registration/outro';
import {
  getValidatedFormData,
  RemixFormProvider,
  useRemixForm,
} from 'remix-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, Schema } from '~/routes/auth/registration/schema';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { Form, redirect } from '@remix-run/react';
import { Box } from '@chakra-ui/react';
import { fetch } from '~/utils/.server/fetch-session.util';
import { getSession } from '~/session.server';

export const meta: MetaFunction = () => [{ title: 'Регистрация | FindIT' }];

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session?.get('sid')) return null;

  const { headers, response } = await fetch('/auth', session);
  const { isAuthenticated } = await response.json();

  return isAuthenticated ? redirect('/dashboard', { headers }) : null;
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  const data = (await getValidatedFormData(request, zodResolver(schema))).data;
  Object.assign(data?.profile, {
    firstName: data?.profile.name.split(' ')[0],
    lastName: data?.profile.name.split(' ')[1],
  });
  delete data?.profile.name;

  const { headers } = await fetch('/auth/registration', session, {
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
