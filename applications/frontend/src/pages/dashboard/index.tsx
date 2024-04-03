import { Grid } from '@chakra-ui/react';
import { defer, LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { NoticeDto } from '@/entities/notices';
import { ProjectDto } from '@/entities/projects';
import { fetchServer } from '@/shared';
import { Notices } from './notices';
import { Projects } from './projects';
import { ResponsesOffers } from './responses-offers';
import { Subscription } from './subscription';
import { ResponseOfferDto } from '@/entities/responses-offers';

export const meta: MetaFunction = () => [
  { title: 'Панель управления | FindIT' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get('Cookie');

  const projects: Promise<ProjectDto[]> = fetchServer(
    '/dashboard/projects',
    cookie,
  ).then(({ response }) => response);

  const responsesOffers: Promise<ResponseOfferDto[]> = fetchServer(
    '/dashboard/responses-offers',
    cookie,
  ).then(({ response }) => response);

  const notices: Promise<NoticeDto[]> = fetchServer(
    '/dashboard/notices?take=15',
    cookie,
  ).then(({ response }) => response);

  return defer({
    projects,
    responsesOffers,
    notices,
  });
}

export default function Dashboard() {
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
