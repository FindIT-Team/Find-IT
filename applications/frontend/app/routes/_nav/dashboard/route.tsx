import { LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { HStack, VStack } from '@chakra-ui/react';
import { Notices } from '~/routes/_nav/dashboard/notice/notices';
import { Projects } from '~/routes/_nav/dashboard/projects/projects';
import { Subscription } from '~/routes/_nav/dashboard/subscription/subscription';
import { ResponsesOffers } from '~/routes/_nav/dashboard/response-offer/response-offers';

export const meta: MetaFunction = () => [
  { title: 'Панель управления | FindIT' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export default function Page() {
  return (
    <HStack justifyContent={'space-around'}>
      <VStack>
        <Notices />
        <Projects />
      </VStack>
      <VStack>
        <ResponsesOffers />
        <Subscription />
      </VStack>
    </HStack>
  );
}
