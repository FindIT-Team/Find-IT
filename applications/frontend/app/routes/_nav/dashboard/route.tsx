import { defer, LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
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
  const cookie = request.headers.get('Cookie');

  const projects: Promise<ProjectDto[]> = fetch(
    '/dashboard/projects',
    cookie,
  ).then(({ response }) => response.json());

  const responsesOffers: Promise<ResponseOfferDto[]> = fetch(
    '/dashboard/responses-offers',
    cookie,
  ).then(({ response }) => response.json());

  const notices: Promise<NoticeDto[]> = fetch(
    '/dashboard/notices',
    cookie,
  ).then(({ response }) => response.json());

  return defer({
    projects,
    responsesOffers,
    notices,
  });
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
      gap={2}
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
