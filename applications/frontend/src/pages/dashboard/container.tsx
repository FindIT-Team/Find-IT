import { Heading, VStack } from '@chakra-ui/react';
import { Dispatch, ReactNode, SetStateAction, useRef } from 'react';
import { Area } from './area';
import { useScrollFetch } from '@/features/scroll-fetch';

export function Container({
  children,
  areaName,
  label,
  array,
  setFunction,
}: {
  children?: ReactNode;
  areaName: string;
  label: string;
  array: Promise<{ id: string }[]>[];
  setFunction: Dispatch<SetStateAction<Promise<unknown[]>[]>>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollFetch({ url: `dashboard/${areaName}`, ref, array, setFunction });

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
