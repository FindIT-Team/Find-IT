import { defer, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Box, Button, Center, HStack } from '@chakra-ui/react';
import { UserDto } from '~/routes/_nav/users/user.dto';
import { fetch } from '~/.server/fetch';
import { Await, useLoaderData, useNavigate } from '@remix-run/react';
import { Suspense } from 'react';
import { UserProvider } from '~/routes/_nav/user/user.context';
import { User } from './user';
import { ArrowBackIcon, Icon } from '@chakra-ui/icons';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.username} | FindIT` }];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const cookie = request.headers.get('Cookie');

  const user: Promise<UserDto> = fetch(
    `/users/${params.username}`,
    cookie,
  ).then(({ response }) => response.json());

  return defer({ username: params.username, user });
}

export default function Page() {
  const { user } = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  return (
    <Center padding={3} paddingBottom={10} boxSize={'full'}>
      <HStack
        border={'1px solid'}
        borderColor={'gray.300'}
        borderRadius={'md'}
        shadow={'md'}
        boxSize={'full'}
        alignItems={'flex-start'}
        padding={5}
      >
        <Suspense>
          <Await resolve={user}>
            {(user) => (
              <UserProvider value={user}>
                <User />
              </UserProvider>
            )}
          </Await>
        </Suspense>
        <Box position={'relative'}>
          <Box position={'absolute'} top={5} right={5}>
            <Button
              padding={0}
              variant={'outline'}
              background={'white'}
              onClick={() => navigate(-1)}
            >
              <Icon as={ArrowBackIcon} />
            </Button>
          </Box>
        </Box>
      </HStack>
    </Center>
  );
}
