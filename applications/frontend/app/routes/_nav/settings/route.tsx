import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Divider, Heading, HStack, VStack } from '@chakra-ui/react';
import { ChangeUsername } from '~/routes/_nav/settings/change-username';

export const meta: MetaFunction = () => [{ title: 'Настройки | FindIT' }];

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export default function Page() {
  return (
    <HStack
      border={'1px solid'}
      borderColor={'gray.300'}
      borderRadius={'lg'}
      padding={4}
      alignItems={'flex-start'}
      width={'100%'}
    >
      <VStack>
        <Heading fontSize={'md'}>
          Сменить имя профиля
          <ChangeUsername />
        </Heading>
        <Divider borderColor={'gray.300'} />
      </VStack>
    </HStack>
  );
}
