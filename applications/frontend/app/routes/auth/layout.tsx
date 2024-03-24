import { fetch } from '~/.server/fetch';
import { redirect } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = request.url.slice(request.url.indexOf('auth'));
  if (url.length > 'auth'.length + 1) {
    const cookie = request.headers.get('Cookie');

    if (!cookie?.includes('sid')) return null;

    const { headers, isAuthenticated } = await fetch('/auth', cookie).then(
      async ({ response, headers }) => ({
        isAuthenticated: (await response.json()).isAuthenticated as boolean,
        headers,
      }),
    );

    return isAuthenticated ? redirect('/dashboard', { headers }) : null;
  } else return redirect('login');
}
