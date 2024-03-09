import { Heading, StackDivider, VStack } from '@chakra-ui/react';
import { ResponseOffer } from '~/routes/_nav/dashboard/response-offer/response-offer';

export function ResponsesOffers() {
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
      <Heading as={'h2'} fontSize={'md'}>
        Отклики и предложения
      </Heading>
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
            <ResponseOffer key={i} />
          ))}
      </VStack>
    </VStack>
  );
}
