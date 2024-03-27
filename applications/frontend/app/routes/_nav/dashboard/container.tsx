import { Heading, VStack } from '@chakra-ui/react';
import { Area } from '~/routes/_nav/dashboard/area';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useScroll } from '~/components/hooks/useScroll';

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
  setFunction: Dispatch<SetStateAction<Promise<unknown[]>[]>>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useScroll({ url: `dashboard/${areaName}`, ref, array, setFunction });

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
        overflowY={'scroll'}
        ref={ref}
        spacing={0}
      >
        {children}
      </VStack>
    </Area>
  );
}
