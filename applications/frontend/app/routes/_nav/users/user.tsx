import { Card, CardBody, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { useContext } from 'react';
import { UserContext } from '~/routes/_nav/users/user.context';

export function User() {
  const { username, name } = useContext(UserContext);

  return (
    <Link to={'/user'} prefetch={'viewport'}>
      <Card
        direction={'row'}
        overflow={'hidden'}
        border={'1px solid'}
        borderColor={'gray.200'}
      >
        <Image objectFit="cover" maxW={'100px'} src={'/pudge.jpeg'} />
        <CardBody>
          <VStack alignItems={'flex-start'}>
            <VStack spacing={0} alignItems={'flex-start'}>
              <Heading fontSize={'xl'}>{username}</Heading>
              <Heading as={'h6'} fontSize={'md'} fontWeight={'medium'}>
                {Object.values(name).join(' ')}
              </Heading>
            </VStack>
            <VStack alignItems={'flex-start'} spacing={0}>
              <Text fontSize={'sm'}>Средний уровень навыков:</Text>
              <Text fontSize={'sm'}>Навыки:</Text>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </Link>
  );
}
