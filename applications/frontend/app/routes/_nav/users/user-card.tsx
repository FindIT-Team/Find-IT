import { Card, CardBody, Heading, HStack, Image, VStack } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

export function UserCard() {
  const user = {
    username: 'kirill',
    name: {
      firstName: 'Кирид',
      lastName: 'Хук'
    },
    contacts: {
      email: 'fdskfj@dm.com',
      telegram: '@askds'
    }
  }

  return (
    <Link
      to={'/user'}
    >
      <Card>
        <CardBody>
          <HStack>
            <VStack alignItems={'flex-start'}>
              <Heading fontSize={'xl'}>{user.username}</Heading>
              <Image src={'pudge.jpeg'} boxSize={40} borderRadius={'lg'} />
              <Heading fontSize={'xl  '}>{Object.values(user.name).join(" ")}</Heading>
            </VStack>
            <HStack alignItems={'flex-start'} justifyContent={'flex-start'}>
              <VStack alignItems={'flex-start'} justifyContent={'flex-start'}>
                <Heading fontSize={'xl'}>Проекты</Heading>
                <Heading fontSize={'md'}>Участник:</Heading>
                <Heading fontSize={'md'}>Основал:</Heading>
              </VStack>
          </HStack>
        </HStack>
        </CardBody>
      </Card>
      </Link>
  );
}
