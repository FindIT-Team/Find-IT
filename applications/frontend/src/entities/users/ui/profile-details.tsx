import { HStack, StackDivider } from '@chakra-ui/react';
import { useContext } from 'react';
import { Contacts } from './contacts';
import { Skills } from './skills';
import { UserContext } from '@/entities/users';

export function ProfileDetails() {
  const { profile } = useContext(UserContext);

  return (
    <HStack
      divider={<StackDivider />}
      alignItems={'flex-start'}
      spacing={5}
      width={'full'}
    >
      {profile.contacts && <Contacts />}
      {profile.skills && <Skills />}
    </HStack>
  );
}
