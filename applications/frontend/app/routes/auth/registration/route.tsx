import { UsernameField } from '~/routes/auth/registration/fields/username.field';
import { NameField } from '~/routes/auth/registration/fields/name.field';
import { EmailField } from '~/routes/auth/registration/fields/email.field';
import { Intro } from '~/routes/auth/registration/intro';
import { ContextProvider } from '~/routes/auth/registration/context';
import { SkillsField } from '~/routes/auth/registration/fields/skills.field';
import { GenderField } from '~/routes/auth/registration/fields/gender-field';
import { PasswordField } from '~/routes/auth/registration/fields/password-field';
import { Outro } from '~/routes/auth/registration/outro';
import { RemixFormProvider, useRemixForm } from 'remix-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, Schema } from '~/routes/auth/registration/schema';
import { ActionFunctionArgs } from '@remix-run/node';
import { Form, redirect } from '@remix-run/react';
import { Box } from '@chakra-ui/react';

export async function action(data: ActionFunctionArgs) {
  const f = await data.request.formData();
  console.log(Object.fromEntries(f));
  return redirect('/auth/login');
}

export default function Page() {
  const remixForm = useRemixForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  return (
    <Box as={'main'} userSelect={'none'}>
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
