import { Heading, VStack } from '@chakra-ui/react';
import { Area } from '~/routes/_nav/dashboard/area';

export function Container({
  children,
  areaName,
  label,
}: {
  children?: React.ReactNode;
  areaName: string;
  label: string;
}) {
  return (
    <Area
      name={areaName}
      chakraProps={{ as: VStack, alignItems: 'flex-start' }}
    >
      <Heading fontSize={'md'}>{label}</Heading>
      <VStack
        border={'1px solid'}
        borderColor={'gray.200'}
        borderRadius={'md'}
        boxSize={'full'}
        background={'gray.50'}
        gap={0}
        overflowY={'scroll'}
      >
        {children}
      </VStack>
    </Area>
  );
}
