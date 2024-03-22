import { Outlet, redirect } from '@remix-run/react';
import { Button, Center, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { NavLinks } from '~/routes/_nav/settings/nav-links';
import { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = request.url.slice(request.url.indexOf('settings'));
  if (url.length > 'settings'.length + 1) return null;
  return redirect('profile');
}

export default function Layout() {
  return (
    <Center padding={10} boxSize={'full'}>
      <HStack
        border={'1px solid'}
        borderColor={'gray.300'}
        borderRadius={'md'}
        shadow={'md'}
        boxSize={'full'}
        alignItems={'flex-start'}
      >
        <NavLinks />
        <Outlet />
        <VStack paddingTop={3} alignItems={'flex-start'} height={'full'}>
          <HStack justifyContent={'flex-start'}>
            <Text>Имя:</Text>
            <Input defaultValue={'Nikola'} htmlSize={8} width="auto" />
          </HStack>
          <HStack justifyContent={'flex-start'}>
            <Text>Фамилия:</Text>
            <Input defaultValue={'Kreslo'} htmlSize={8} width="auto" />
          </HStack>
          <Button
            backgroundColor={'#451ceb'}
            color={'white'}
            size={'xs'}
            justifyContent={'flex-end'}
            borderRadius={'md'}
          >
            <Text>Сохранить</Text>
          </Button>
        </VStack>
      </HStack>
    </Center>
  );
}
