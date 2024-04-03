import { Grid, Heading, HStack, VStack } from '@chakra-ui/react';
import { defer, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { Dispatch, SetStateAction, Suspense, useRef, useState } from 'react';
import { UserCard, UserDto, UserProvider } from '@/entities/users';
import { fetchServer, useScroll } from '@/shared';

export const meta: MetaFunction = () => [{ title: 'Пользователи | FindIT' }];

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get('Cookie');

  const users: Promise<UserDto[]> = fetchServer('/users?take=20', cookie).then(
    ({ response }) => response,
  );

  return defer({ users });
}

export default function Users() {
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
