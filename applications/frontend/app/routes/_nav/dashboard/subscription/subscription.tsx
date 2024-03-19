import { Heading, StackDivider, VStack } from '@chakra-ui/react';

export function Subscription() {
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
      <Heading fontSize={'md'}>Подписка</Heading>
      <VStack
        justifyContent={'space-between'}
        border={'1px solid'}
        borderColor={'gray.300'}
        borderRadius={'lg'}
        width={'full'}
        height={'full'}
        divider={<StackDivider />}
      ></VStack>
    </VStack>
  );
}
