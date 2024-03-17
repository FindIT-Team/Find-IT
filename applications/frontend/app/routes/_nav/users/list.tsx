import { Heading, HStack, VStack } from '@chakra-ui/react';
import { UserCard } from '~/routes/_nav/users/user-card';
import { ProjectCard } from '../project/project-card';

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
            <ProjectCard key={i} />
          ))}
      </HStack>
    </VStack>
  );
}
