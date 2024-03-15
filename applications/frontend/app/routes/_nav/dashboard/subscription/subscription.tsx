import { Area } from '~/routes/_nav/dashboard/area';
import { Flex } from '@chakra-ui/react';
import packagejson from '../../../../../../../package.json';

export function Subscription() {
  return (
    <Area name={'subscription'}>
      <Flex justifyContent={'center'} alignItems={'center'} boxSize={'full'}>
        RC v{packagejson.version}
      </Flex>
    </Area>
  );
}
