import { Divider, Heading, HStack, VStack } from '@chakra-ui/react';

export function Skill() {
  return (
    <VStack>
      <HStack>
        <Heading fontSize={'xl'}>IQ:</Heading>
        <Heading fontSize={'xl'}>3</Heading>
      </HStack>
      <Divider width={'full'} borderColor={'gray.300'} />
    </VStack>
  );
}
