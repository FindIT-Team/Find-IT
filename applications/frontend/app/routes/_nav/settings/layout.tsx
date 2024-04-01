import { Outlet, redirect } from '@remix-run/react';
import { Center, HStack } from '@chakra-ui/react';
import { NavLinks } from '~/routes/_nav/settings/nav-links';
import { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = request.url.slice(request.url.indexOf('settings'));
  if (url.length > 'settings'.length + 1) return null;
  return redirect('profile');
}

export default function Layout() {
  return (
    <Center padding={3} paddingBottom={10} boxSize={'full'}>
      <HStack
        border={'1px solid'}
        borderColor={'gray.200'}
        borderRadius={'md'}
        shadow={'md'}
        boxSize={'full'}
        alignItems={'flex-start'}
      >
        <NavLinks />
        <Outlet />
      </HStack>
    </Center>
  );
}
