import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { List } from '~/routes/usersList/list';
import { HStack, VStack } from '@chakra-ui/react';
import { FiltersBar } from '~/routes/usersList/filtersBar';

export const meta: MetaFunction = () => [
  { title: 'Список пользователей | FindIT' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export default function Page() {
  return (
    <VStack alignItems={'flex-end'}>
      <HStack justifyContent={'flex-end'}>
        <FiltersBar />
        <List />
      </HStack>
    </VStack>
  );
}
