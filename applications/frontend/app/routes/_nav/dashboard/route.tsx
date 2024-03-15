import { Grid } from '@chakra-ui/react';
import { LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { Notices } from './notices/notices';
import { Projects } from './projects/projects';
import { ResponsesOffers } from './responses-offers/responses-offers';
import { Subscription } from './subscription/subscription';

export const meta: MetaFunction = () => [
  { title: 'Панель управления | FindIT' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export default function Page() {
  return (
    <Grid
      as={'main'}
      flexGrow={1}
      height={'100vh'}
      templateAreas={`
        'responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers notices notices notices notices notices'
        'responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers notices notices notices notices notices'
        'responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers notices notices notices notices notices'
        'responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers notices notices notices notices notices'
        'responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers notices notices notices notices notices'
        'responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers notices notices notices notices notices'
        'responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers notices notices notices notices notices'
        'responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers notices notices notices notices notices'
        'responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers notices notices notices notices notices'
        'responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers notices notices notices notices notices'
        'responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers notices notices notices notices notices'
        'responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers responsesOffers notices notices notices notices notices'
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
