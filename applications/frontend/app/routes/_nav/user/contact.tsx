import {
  Divider,
  Heading,
  HStack,
  Spacer,
  Tag,
  VStack,
} from '@chakra-ui/react';

export function Contact({contact}: {contact: [string, string]}) {
  return (
    <VStack alignItems={'flex-start'}>
      <HStack>
        <Heading fontSize={'xl'}>{contact[1]}</Heading>
        <Tag justifySelf={'flex-end'} borderRadius={8} bg={'gray.200'}>
        {contact[0]}
        </Tag>
      </HStack>
      <Divider width={'full'} borderColor={'gray.300'} />
      <Spacer />
    </VStack>
  );
}
