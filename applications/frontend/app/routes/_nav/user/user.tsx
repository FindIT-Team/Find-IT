import { HStack, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from './user.context';
import { Username } from '~/routes/_nav/user/username';
import { ProfileDetails } from '~/routes/_nav/user/profile-details';

export function User() {
  const { projects } = useContext(UserContext);

  return (
    <HStack flexGrow={1} spacing={0} boxSize={'full'}>
      {/*<VStack width={'20%'} padding={3}>*/}
      {/*  <Image src={'pudge.jpeg'} boxSize={60} borderRadius={'full'} />*/}
      {/*</VStack>*/}
      <VStack
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        spacing={20}
        padding={5}
        flexGrow={1}
        boxSize={'full'}
      >
        <VStack alignItems={'flex-start'} spacing={10} boxSize={'full'}>
          <Username />
          <ProfileDetails />
        </VStack>
        {/*Need Projects*/}
      </VStack>
    </HStack>
  );
}
