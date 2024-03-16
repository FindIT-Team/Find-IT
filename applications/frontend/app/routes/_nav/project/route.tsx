import { Heading, HStack } from '@chakra-ui/react';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => [{ title: 'Проект | FindIT' }];

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}
export default function Page() {
  return (
    <HStack
      border={'1px solid'}
      borderColor={'gray.300'}
      borderRadius={'lg'}
      padding={1}
      alignItems={'flex-start'}
      height={900}
      width={1780}
    >
      <Heading>Страница проекта</Heading>
    </HStack>
  );
}
