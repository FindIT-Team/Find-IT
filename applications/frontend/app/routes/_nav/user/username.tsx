import { Heading, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '~/routes/_nav/user/user.context';

export function Username() {
  const { username, profile } = useContext(UserContext);

  return (
    <VStack alignItems={'flex-start'} spacing={0}>
      <Heading>{username}</Heading>
      <Heading as={'h3'} fontSize={'lg'} fontWeight={'medium'}>
        {profile.firstName} {profile.lastName}
      </Heading>
    </VStack>
  );
}
