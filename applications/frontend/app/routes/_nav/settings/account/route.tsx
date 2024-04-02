import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/react';
import { InviteParticipants } from '~/routes/_nav/settings/invite-participants';

export const meta: MetaFunction = () => [
  { title: 'Настройки аккаунта | FindIT' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return json({ url: request.url });
}

export default function Page() {
  return (
    <>
      <InviteParticipants />
    </>
  );
}
