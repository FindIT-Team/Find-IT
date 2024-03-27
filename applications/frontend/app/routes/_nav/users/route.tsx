import { defer, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Center, Grid, Heading, VStack } from '@chakra-ui/react';
import { User } from '~/routes/_nav/users/user';
import { fetch } from '~/.server/fetch';
import { Await, useLoaderData } from '@remix-run/react';
import { Dispatch, SetStateAction, Suspense, useRef, useState } from 'react';
import { useScroll } from '~/components/hooks/useScroll';
import { UserProvider } from '~/routes/_nav/users/user.context';
import { UserDto } from './user.dto';

export const meta: MetaFunction = () => [{ title: 'Пользователи | FindIT' }];

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get('Cookie');

  const users: Promise<UserDto[]> = fetch('/users?take=20', cookie).then(
    ({ response }) => response.json(),
  );

  return defer({ users });
}

export default function Page() {
  const { users: initPack } = useLoaderData<typeof loader>();
  const [users, setUsers] = useState([initPack]);

  const ref = useRef<HTMLDivElement>(null);

  useScroll({
    url: 'users',
    ref,
    array: users,
    setFunction: setUsers as Dispatch<SetStateAction<Promise<unknown[]>[]>>,
  });

  return (
    <Center padding={3} paddingBottom={10} boxSize={'full'}>
      <VStack
        border={'1px solid'}
        borderColor={'gray.300'}
        borderRadius={'md'}
        shadow={'md'}
        boxSize={'full'}
        alignItems={'flex-start'}
        padding={5}
      >
        <Heading fontSize={'2xl'}>Пользователи</Heading>
        <Grid
          gridTemplateColumns={'repeat(auto-fill, minmax(350px, 1fr))'}
          gap={3}
          overflow={'scroll'}
          width={'full'}
          ref={ref}
        >
          {users.map((pack, index) => (
            <Suspense
              key={index}
              fallback={
                <Heading aria-details={'skeleton'}>Skeleton need</Heading>
              }
            >
              <Await resolve={pack}>
                {(pack) =>
                  pack.map((user) => (
                    <UserProvider key={user.id} value={user}>
                      <User />
                    </UserProvider>
                  ))
                }
              </Await>
            </Suspense>
          ))}
        </Grid>
      </VStack>
    </Center>
  );
}
