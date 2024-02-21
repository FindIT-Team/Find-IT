import { getSession } from '~/session.server';
import { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get('Cookie');
  const session = await getSession(cookie);

  if (!session) return redirect('/auth/login');

  const response = await fetch('http://api.findit.test/auth', {
    headers: {
      'Content-Type': 'application/json',
      Cookie: Object.entries(session.data)
        .map(([key, value]) => `${key}=${value}`)
        .join('; '),
    },
  });

  return await response.json();
}
