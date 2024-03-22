import { defer, LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { getSession } from '~/session.server';
import { redirect } from '@remix-run/react';
import { fetch } from '~/utils/.server/fetch-session.util';
import { Grid } from '@chakra-ui/react';
import { Notices } from '~/routes/_nav/dashboard/notices/notices';
import { Projects } from './projects/projects';
import { ResponsesOffers } from '~/routes/_nav/dashboard/responses-offers/responses-offers';
import { Subscription } from '~/routes/_nav/dashboard/subscription/subscription';
import { ProjectDto } from '~/routes/_nav/dashboard/projects/project.dto';
import { NoticeDto } from '~/routes/_nav/dashboard/notices/notice.dto';
import { ResponseOfferDto } from '~/routes/_nav/dashboard/responses-offers/response-offer.dto';

export const meta: MetaFunction = () => [
  { title: 'Панель управления | FindIT' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const sid = session?.get('sid');

  const projects: Promise<ProjectDto[]> = fetch(
    '/dashboard/projects',
    session,
  ).then(({ response }) => response.json());

  const responsesOffers: Promise<ResponseOfferDto[]> = fetch(
    '/dashboard/responses-offers',
    session,
  ).then(({ response }) => response.json());

  const notices: Promise<NoticeDto[]> = fetch(
    '/dashboard/notices',
    session,
  ).then(({ response }) => response.json());

  return defer(
    {
      projects,
      responsesOffers,
      notices,
    },
    {
      headers: {
        'Set-Cookie': `sid=${encodeURIComponent(sid)}; Max-Age=${60}; Domain=${process.env.DOMAIN}; SameSite=Lax; Path=/; HttpOnly;`,
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
