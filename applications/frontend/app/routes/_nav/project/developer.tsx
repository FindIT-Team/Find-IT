import { Heading, HStack, Image } from '@chakra-ui/react';

export function Developer() {
  return (
    <HStack
      width={'full'}
      height={50}
      justifyContent={'flex-start'}
      paddingX={3}
    >
      <Image src={'pudge.jpeg'} boxSize={42} borderRadius={'full'}></Image>
      <Heading fontSize={'xl'}> Chuspanchik</Heading>
    </HStack>
  );
}
