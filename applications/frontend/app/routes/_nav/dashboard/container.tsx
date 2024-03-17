import { Heading, VStack } from '@chakra-ui/react';
import { Area } from '~/routes/_nav/dashboard/area';
import { useRef } from 'react';
import { useDashboardScroll } from '~/components/hooks/useDashboardScroll';

export function Container({
  children,
  areaName,
  label,
  array,
  setFunction,
}: {
  children?: React.ReactNode;
  areaName: string;
  label: string;
  array: Promise<{ id: string }[]>[];
  setFunction: React.Dispatch<React.SetStateAction<any>>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useDashboardScroll({ areaName, ref, array, setFunction });

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
        ref={ref}
      >
        {children}
      </VStack>
    </Area>
  );
}
