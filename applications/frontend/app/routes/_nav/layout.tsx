import { chakra, HStack, VStack } from '@chakra-ui/react';
import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { NavLinks } from '~/routes/_nav/nav-links';
import { getSession } from '~/session.server';
import { fetch } from '~/utils/.server/fetch-session.util';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const sid = session?.get('sid');

  if (!sid) return redirect('/auth/login');

  const { isAuthenticated } = await fetch('/auth', session).then(
    async ({ headers, response }) => ({
      headers,
      isAuthenticated: (await response.json()).isAuthenticated,
    }),
  );

  if (!isAuthenticated) return redirect('/auth/login');
  return null;
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
