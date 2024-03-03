import { LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { Box } from '@chakra-ui/react';

export const meta: MetaFunction = () => [
  { title: 'Панель управления | FindIT' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export default function Page() {
  return <Box></Box>;
}
