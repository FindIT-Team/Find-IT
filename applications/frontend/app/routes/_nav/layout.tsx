import { chakra, HStack, VStack } from '@chakra-ui/react';
import { Outlet } from '@remix-run/react';
import { NavLinks } from '~/routes/_nav/nav-links';

export default function Layout() {
  return (
    <HStack height={'100vh'} userSelect={'none'}>
      <VStack as={'nav'} height={'full'} justifyContent={'space-between'} p={3}>
        <NavLinks />
        <chakra.div boxSize={2}></chakra.div>
      </VStack>
      <chakra.main flexGrow={1}>
        <Outlet />
      </chakra.main>
    </HStack>
  );
}
