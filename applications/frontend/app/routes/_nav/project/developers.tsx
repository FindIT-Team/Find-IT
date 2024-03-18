import { Heading, VStack } from '@chakra-ui/react';
import { Developer } from '~/routes/_nav/project/delovoper';

export function Developers() {
  return (
    <VStack width={300} height={'full'} alignItems={'flex-start'}>
      <Heading fontSize={'xl'}>Разработчики:</Heading>
      <VStack
        justifyContent={'space-between'}
        border={'1px solid'}
        borderColor={'gray.300'}
        borderRadius={'lg'}
        width={'full'}
        height={'full'}
        paddingY={3}
      >
        {Array(10)
          .fill(null)
          .map((v, i) => (
            <Developer key={i} />
          ))}
      </VStack>
    </VStack>
  );
}
