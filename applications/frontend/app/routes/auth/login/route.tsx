import { Link } from '~/components/link';
// import LoginWith from '~/routes/auth/login/login-with';
import { Form } from '~/routes/auth/login/login-form';
import { loginUrls } from '~/routes/auth/login/login-urls';
import { ActionFunctionArgs, CookieSerializeOptions } from '@remix-run/node';
import { getValidatedFormData } from 'remix-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '~/routes/auth/login/shema';
import { redirect } from '@remix-run/react';
import setCookie from 'set-cookie-parser';
import { commitSession, getSession } from '~/session.server';

export async function action({ request }: ActionFunctionArgs) {
  const data = (await getValidatedFormData(request, zodResolver(schema))).data;
  const res = await fetch(`http://api.${process.env.DOMAIN}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      ...request.headers,
      'Content-Type': 'application/json',
    },
  });

  const setCookieHeader = res.headers.get('Set-Cookie');

  if (!setCookieHeader) throw new Error(`Set-Cookie header wasn't found`);

  const parsedResponseCookies = setCookie.parse(
    setCookie.splitCookiesString(setCookieHeader as string),
  );
  const authCookie = parsedResponseCookies.find(
    (cookie) => cookie.name === 'sid',
  );

  if (!authCookie) throw new Error(`No cookie was found`);

  const { name, value, ...sessionIdCookieSerializeOptions } = authCookie;

  const session = await getSession(request.headers.get('Cookie'));
  session.set(name, value);

  const headers = new Headers();
  headers.append(
    'Set-Cookie',
    await commitSession(
      session,
      sessionIdCookieSerializeOptions as CookieSerializeOptions,
    ),
  );

  return redirect('/dashboard', { headers });
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
