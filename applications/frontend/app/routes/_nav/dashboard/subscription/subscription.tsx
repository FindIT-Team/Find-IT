import { Area } from '~/routes/_nav/dashboard/area';
import { Flex } from '@chakra-ui/react';

export function Subscription() {
  return (
    <Area name={'subscription'}>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        boxSize={'full'}
        fontSize={'sm'}
        color={'gray.600'}
      >
        Beta v0.3.2
      </Flex>
    </Area>
  );
}
