import { HStack, StackDivider } from '@chakra-ui/react';
import { Contacts } from '~/routes/_nav/user/contacts';
import { Skills } from '~/routes/_nav/user/skills';
import { useContext } from 'react';
import { UserContext } from '~/routes/_nav/user/user.context';

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
