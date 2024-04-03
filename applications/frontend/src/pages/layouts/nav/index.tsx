import { chakra, HStack, VStack } from '@chakra-ui/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, redirect } from '@remix-run/react';
import { fetchServer } from '@/shared';
import { NavLinks } from './nav-links';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get('Cookie');
  if (!cookie?.includes('sid')) return redirect('/auth/login');

  const { headers, isAuthenticated } = await fetchServer('/auth', cookie).then(
    async ({ response, headers }) => ({
      isAuthenticated: response.isAuthenticated as boolean,
      headers,
    }),
  );

  return isAuthenticated
    ? new Response(null, { headers })
    : redirect('/auth/login');
}

export default function Nav() {
  return (
    <HStack height={'100vh'} userSelect={'none'} spacing={0}>
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
