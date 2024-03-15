import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { HStack, VStack } from '@chakra-ui/react';

export const meta: MetaFunction = () => [{ title: 'Профиль | FindIT' }];

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}
export default function Page() {
  return (
    <HStack>
      <VStack></VStack>
    </HStack>
  );
}
