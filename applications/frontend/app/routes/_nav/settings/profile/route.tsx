import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => [
  { title: 'Настройки профиля | FindIT' },
];

export async function loader({}: LoaderFunctionArgs) {
  return null;
}

export default function Page() {
  return <></>;
}