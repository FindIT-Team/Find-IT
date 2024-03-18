import { Heading, HStack, VStack } from '@chakra-ui/react';
import { ProfileCard } from '~/routes/_nav/profile/profile-card';

export function List() {
  return (
    <VStack
      border={'1px solid'}
      borderColor={'gray.300'}
      borderRadius={'lg'}
      padding={1}
      alignItems={'flex-start'}
    >
      <Heading fontSize={'md'} padding={2}>
        Пользователи
      </Heading>

      <HStack flexWrap={'wrap'} justifyContent={'space-between'} padding={'1%'}>
        {Array(52)
          .fill(null)
          .map((v, i) => (
            <ProfileCard key={i} />
          ))}
      </HStack>
    </VStack>
  );
}
