import { Center, HStack } from '@chakra-ui/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, redirect } from '@remix-run/react';
import { NavLinks } from './nav-links';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = request.url.slice(request.url.indexOf('settings'));
  if (url.length > 'settings'.length + 1) return null;
  return redirect('profile');
}

export default function SettingsNav() {
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
