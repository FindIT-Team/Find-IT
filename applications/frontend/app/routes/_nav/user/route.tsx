import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import {
  Divider,
  Heading,
  HStack,
  Image,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { Contacts } from './contacts';
import { Skills } from './skills';

export const meta: MetaFunction = () => [{ title: 'Профиль | FindIT' }];

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}
export default function Page() {
  const user = {
    username: 'kirill',
    name: {
      firstName: 'Кирид',
      lastName: 'Хук'
    },
    contacts: {
      email: 'fdskfj@dm.com',
      telegram: '@askds' 
    },
    skills: {
      devOps: 10,
      front: 8,
    

    }
  }

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
        <Heading>{user.username}</Heading>
        <Heading fontSize={'xl'}>{Object.values(user.name).join(" ")}</Heading>
        <Spacer height={10} />
        <HStack alignItems={'flex-start'}>
          <Contacts contacts={user.contacts} />
          <Divider
            orientation={'vertical'}
            borderColor={'gray.300'}
            height={250}
          />
          <VStack width={'full'} alignItems={'flex-start'}>
            <Skills skills={user.skills as unknown as Record<string, string>} />
          </VStack>
        </HStack>
        <VStack>
          <Heading fontSize={'xl'}>Участие в проектах:</Heading>
        </VStack>
      </VStack>
    </HStack>
  );
}
