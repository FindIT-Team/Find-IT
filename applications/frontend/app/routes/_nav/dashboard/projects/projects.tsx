import { Heading, StackDivider, VStack } from '@chakra-ui/react';
import { Project } from '~/routes/_nav/dashboard/projects/project';

export function Projects() {
  return (
    <VStack
      border={'1px solid'}
      borderColor={'gray.300'}
      borderRadius={'lg'}
      padding={4}
      alignItems={'flex-start'}
      width={500}
      height={400}
    >
      <Heading fontSize={'md'}>Мои проекты</Heading>
      <VStack
        justifyContent={'space-between'}
        border={'1px solid'}
        borderColor={'gray.300'}
        borderRadius={'lg'}
        width={'full'}
        height={'full'}
        divider={<StackDivider />}
        overflowY={'scroll'}
      >
        {Array(10)
          .fill(null)
          .map((v, i) => (
            <Project key={i} />
          ))}
      </VStack>
    </VStack>
  );
}
