import { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';
import { fetchServer } from '@/shared';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get('Cookie');

  if (!cookie?.includes('sid')) return null;

  const { headers, isAuthenticated } = await fetchServer('/auth', cookie).then(
    async ({ response, headers }) => ({
      isAuthenticated: response.isAuthenticated as boolean,
      headers,
    }),
  );

  return isAuthenticated ? redirect('/dashboard', { headers }) : null;
}
