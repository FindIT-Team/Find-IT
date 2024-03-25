import { Heading, HStack, Spacer, Tag, Text, VStack } from '@chakra-ui/react';
import { UserContext } from './user.context';
import { useContext } from 'react';

export function Contacts() {
  const { profile } = useContext(UserContext);

  return (
    <HStack>
      <Text fontSize={'md'}>
        Контакты:
        <Spacer height={5} />
        {Object.entries(profile.contacts).map((contact) => (
          <VStack alignItems={'flex-start'}>
            <HStack>
              <Heading fontSize={'xl'}>{contact[1]}</Heading>
              <Tag justifySelf={'flex-end'} borderRadius={8} bg={'gray.200'}>
                {contact[0]}
              </Tag>
            </HStack>
          </VStack>
        ))}
      </Text>
    </HStack>
  );
}
