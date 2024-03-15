import { chakra, HStack, VStack } from '@chakra-ui/react';
import { Outlet } from '@remix-run/react';
import { NavLinks } from '~/routes/_nav/nav-links';

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
      <Outlet />
    </HStack>
  );
}
