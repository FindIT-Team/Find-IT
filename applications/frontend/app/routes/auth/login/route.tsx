import { Link } from '~/components/link';
// import LoginWith from '~/routes/auth/login/login-with';
import { Form } from '~/routes/auth/login/login-form';
import { loginUrls } from '~/routes/auth/login/login-urls';
import { redirect } from '@remix-run/react';
import { ActionFunctionArgs } from '@remix-run/node';
import { getValidatedFormData } from 'remix-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '~/routes/auth/login/shema';

export async function action({ request }: ActionFunctionArgs) {
  const data = (await getValidatedFormData(request, zodResolver(schema))).data;
  const res = await fetch(`http://api.${process.env.DOMAIN}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return redirect(`http://api.${process.env.DOMAIN}/auth`);
}

export default function Page() {
  return (
    <>
      <div>
        {loginUrls.map((u) => (
          <Link key={u.id} href={u.href} to={''} />
        ))}
      </div>
      <div>
        <div>
          {/*<LoginWith />*/}
          <div>
            <hr />
          </div>
          <Form />
        </div>
        <div />
      </div>
    </>
  );
}
