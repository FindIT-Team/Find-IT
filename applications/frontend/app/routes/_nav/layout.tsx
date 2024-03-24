import { chakra, HStack, VStack } from '@chakra-ui/react';
import { Outlet, redirect } from '@remix-run/react';
import { NavLinks } from '~/routes/_nav/nav-links';
import { LoaderFunctionArgs } from '@remix-run/node';
import { fetch } from '~/.server/fetch';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get('Cookie');
  if (!cookie?.includes('sid')) return redirect('/auth/login');

  const { headers, isAuthenticated } = await fetch('/auth', cookie).then(
    async ({ response, headers }) => ({
      isAuthenticated: (await response.json()).isAuthenticated as boolean,
      headers,
    }),
  );

  return isAuthenticated
    ? new Response(null, { headers })
    : redirect('/auth/login');
}

export default function Layout() {
  return (
    <HStack height={'100vh'} userSelect={'none'}>
      <VStack
        as={'nav'}
        height={'full'}
        justifyContent={'space-between'}
        padding={3}
        borderRight={'1px solid'}
        borderColor={'gray.200'}
        shadow={'md'}
      >
        <NavLinks />
        <chakra.div></chakra.div>
      </VStack>
      <chakra.main flexGrow={1} height={'full'}>
        <Outlet />
      </chakra.main>
    </HStack>
  );
}
