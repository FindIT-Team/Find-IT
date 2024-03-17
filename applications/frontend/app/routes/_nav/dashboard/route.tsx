import { Grid } from '@chakra-ui/react';
import {
  LoaderFunctionArgs,
  type MetaFunction,
  redirect,
} from '@remix-run/node';
import { getSession } from '~/session.server';
import { fetch as fetchServer } from '~/utils/.server/fetch-session.util';
import { defer } from '@remix-run/react';
import { Notices } from './notices/notices';
import { Projects } from './projects/projects';
import { ResponsesOffers } from './responses-offers/responses-offers';
import { Subscription } from './subscription/subscription';

export const meta: MetaFunction = () => [
  { title: 'Панель управления | FindIT' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const sid = session?.get('sid');

  if (!sid) return redirect('/auth/login');

  const projects = fetchServer('/dashboard/projects', session).then(
    ({ response }) => response.json(),
  );
  const notices = fetchServer('/dashboard/notices', session).then(
    ({ response }) => response.json(),
  );
  const responsesOffers = fetchServer(
    '/dashboard/responses-offers',
    session,
  ).then(({ response }) => response.json());

  return defer(
    {
      projects,
      notices,
      responsesOffers,
    },
    {
      headers: {
        'Set-Cookie': `sid=${encodeURIComponent(sid)}; Max-Age=${60}; Domain=${process.env.DOMAIN}; SameSite=Lax; Path=/; HttpOnly`,
      },
    },
  );
}

export default function Page() {
  return (
    <Grid
      as={'main'}
      flexGrow={1}
      height={'100vh'}
      templateAreas={`
        'responses-offers responses-offers responses-offers responses-offers responses-offers responses-offers notices notices notices notices notices'
        'responses-offers responses-offers responses-offers responses-offers responses-offers responses-offers notices notices notices notices notices'
        'responses-offers responses-offers responses-offers responses-offers responses-offers responses-offers notices notices notices notices notices'
        'responses-offers responses-offers responses-offers responses-offers responses-offers responses-offers notices notices notices notices notices'
        'responses-offers responses-offers responses-offers responses-offers responses-offers responses-offers notices notices notices notices notices'
        'responses-offers responses-offers responses-offers responses-offers responses-offers responses-offers notices notices notices notices notices'
        'responses-offers responses-offers responses-offers responses-offers responses-offers responses-offers notices notices notices notices notices'
        'responses-offers responses-offers responses-offers responses-offers responses-offers responses-offers notices notices notices notices notices'
        'responses-offers responses-offers responses-offers responses-offers responses-offers responses-offers notices notices notices notices notices'
        'responses-offers responses-offers responses-offers responses-offers responses-offers responses-offers notices notices notices notices notices'
        'responses-offers responses-offers responses-offers responses-offers responses-offers responses-offers notices notices notices notices notices'
        'responses-offers responses-offers responses-offers responses-offers responses-offers responses-offers notices notices notices notices notices'
        'projects projects projects projects projects projects notices notices notices notices notices'
        'projects projects projects projects projects projects notices notices notices notices notices'
        'projects projects projects projects projects projects notices notices notices notices notices'
        'projects projects projects projects projects projects notices notices notices notices notices'
        'projects projects projects projects projects projects notices notices notices notices notices'
        'projects projects projects projects projects projects notices notices notices notices notices'
        'projects projects projects projects projects projects notices notices notices notices notices'
        'projects projects projects projects projects projects notices notices notices notices notices'
        'projects projects projects projects projects projects notices notices notices notices notices'
        'projects projects projects projects projects projects subscription subscription subscription subscription subscription'
        'projects projects projects projects projects projects subscription subscription subscription subscription subscription'
      `}
      gridTemplateRows={'repeat(23, 1fr)'}
      gridTemplateColumns={'repeat(11, 1fr)'}
      gap={1}
      padding={3}
      paddingBottom={10}
    >
      <Notices />
      <Projects />
      <ResponsesOffers />
      <Subscription />
    </Grid>
  );
}
