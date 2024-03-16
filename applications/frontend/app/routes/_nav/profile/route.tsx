import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import {
  Divider,
  Heading,
  HStack,
  Image,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { Contacts } from '~/routes/_nav/profile/contacts';
import { Skills } from '~/routes/_nav/profile/skils';

export const meta: MetaFunction = () => [{ title: 'Профиль | FindIT' }];

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}
export default function Page() {
  return (
    <HStack
      border={'1px solid'}
      borderColor={'gray.300'}
      borderRadius={'lg'}
      padding={1}
      alignItems={'flex-start'}
      height={900}
      width={1780}
    >
      <VStack width={'20%'} padding={3}>
        <Image src={'pudge.jpeg'} boxSize={60} borderRadius={'full'} />
      </VStack>

      <VStack padding={3} alignItems={'flex-start'}>
        <Heading>Pudge21</Heading>
        <Heading fontSize={'xl'}>Кирил Иванович Хук</Heading>
        <Spacer height={10} />
        <HStack alignItems={'flex-start'}>
          <Contacts />
          <Divider
            orientation={'vertical'}
            borderColor={'gray.300'}
            height={250}
          />
          <VStack width={'full'} alignItems={'flex-start'}>
            <Skills />
          </VStack>
        </HStack>
        <VStack>
          <Heading fontSize={'xl'}>Участие в проектах:</Heading>
        </VStack>
      </VStack>
    </HStack>
  );
}
