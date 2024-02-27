import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => [{ title: 'Настройки | FindIT' }];

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export default function Page() {}
