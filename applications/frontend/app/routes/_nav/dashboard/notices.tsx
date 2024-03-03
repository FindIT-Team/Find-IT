import { Heading, StackDivider, VStack } from '@chakra-ui/react';
import { Notice } from '~/routes/_nav/dashboard/notice';

export function Notices() {
  return (
    <VStack
      border={'1px solid'}
      borderColor={'gray.300'}
      borderRadius={'lg'}
      padding={4}
      alignItems={'flex-start'}
      width={400}
      height={300}
    >
      <Heading fontSize={'md'}>Уведомления</Heading>
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
            <Notice key={i} />
          ))}
      </VStack>
    </VStack>
  );
}
