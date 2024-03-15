import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { List } from '~/routes/_nav/users/list';
import { HStack, VStack } from '@chakra-ui/react';

export const meta: MetaFunction = () => [
  { title: 'Список пользователей | FindIT' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export default function Page() {
  return (
    <VStack height={940}>
      <HStack>
        <List />
      </HStack>
    </VStack>
  );
}
