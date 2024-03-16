import {
  Divider,
  Heading,
  HStack,
  Spacer,
  Tag,
  VStack,
} from '@chakra-ui/react';

export function Contact() {
  return (
    <VStack alignItems={'flex-start'}>
      <HStack>
        <Heading fontSize={'xl'}>fhwdfsdfsfa@gmail.com</Heading>
        <Tag justifySelf={'flex-end'} borderRadius={8} bg={'gray.200'}>
          Email
        </Tag>
      </HStack>
      <Divider width={'full'} borderColor={'gray.300'} />
      <Spacer />
    </VStack>
  );
}
