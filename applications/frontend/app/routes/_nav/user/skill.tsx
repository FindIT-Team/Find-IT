import { Divider, Heading, HStack, VStack } from '@chakra-ui/react';

export function Skill({skill}: {skill: [string, string]}) {
  return (
    <VStack>
      <HStack>
        <Heading fontSize={'xl'}>{skill[0]}</Heading>
        <Heading fontSize={'xl'}>{skill[1]}</Heading>
      </HStack>
      <Divider width={'full'} borderColor={'gray.300'} />
    </VStack>
  );
}
