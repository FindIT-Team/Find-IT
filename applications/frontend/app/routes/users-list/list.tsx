import { Heading, HStack, VStack } from '@chakra-ui/react';
import { UserCard } from '~/routes/users-list/user-card';

export function List() {
  return (
    <VStack
      border={'1px solid'}
      borderColor={'gray.300'}
      borderRadius={'lg'}
      padding={4}
      alignItems={'flex-start'}
      width={'80%'}
    >
      <Heading fontSize={'md'}>Пользователи</Heading>
      <HStack flexWrap={'wrap'} justifyContent={'space-between'}>
        {Array(12)
          .fill(null)
          .map((v, i) => (
            <UserCard key={i} />
          ))}
      </HStack>
    </VStack>
  );
}
