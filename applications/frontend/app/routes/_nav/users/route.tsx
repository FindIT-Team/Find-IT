import { defer, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Grid, Heading, HStack, VStack } from '@chakra-ui/react';
import { UserCard } from '~/routes/_nav/users/user-card';
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
    <VStack alignItems={'flex-start'} boxSize={'full'} padding={3}>
      <HStack padding={2}>
        <Heading fontSize={'2xl'}>Пользователи</Heading>
      </HStack>
      <Grid
        flexGrow={1}
        gridTemplateColumns={'repeat(auto-fill, minmax(350px, 1fr))'}
        gap={3}
        overflow={'scroll'}
        boxSize={'full'}
        ref={ref}
      >
        {Array(400)
          .fill(null)
          .map((pack, index) => (
            <Suspense
              key={index}
              fallback={
                <Heading aria-details={'skeleton'}>Skeleton need</Heading>
              }
            >
              <Await resolve={users[0]}>
                {(pack) =>
                  pack.map((user) => (
                    <UserProvider key={user.id} value={user}>
                      <UserCard />
                    </UserProvider>
                  ))
                }
              </Await>
            </Suspense>
          ))}
      </Grid>
    </VStack>
  );
}
