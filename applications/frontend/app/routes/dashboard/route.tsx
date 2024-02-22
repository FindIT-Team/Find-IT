import { getSession } from '~/session.server';
import { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';
import { fetch } from '~/fetch.util';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.data) return redirect('/auth/login');

  const { response } = await fetch(session, 'http://api.findit.test/auth');

  return { ...(await response.json()) };
}
