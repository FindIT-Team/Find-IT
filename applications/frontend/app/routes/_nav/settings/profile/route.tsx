import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { InviteParticipants } from '~/routes/_nav/settings/invite-participants';
import { json } from '@remix-run/react';

export const meta: MetaFunction = () => [
  { title: 'Настройки профиля | FindIT' },
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
