import { Icon } from '@chakra-ui/icons';
import { Heading, HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';


export function IconWithValue({
  children,
  icon,
  boxSize,
  fontSize = 'md',
  spacing,
}: {
  children: ReactNode;
  icon: IconType;
  boxSize?: number;
  fontSize?: string;
  spacing?: string | number;
}) {
  return (
    <HStack spacing={spacing}>
      <Icon as={icon} boxSize={boxSize} color={'gray.600'} />
      <Heading
        as={'h6'}
        color={'gray.600'}
        fontSize={fontSize}
        fontWeight={'medium'}
      >
        {children}
      </Heading>
    </HStack>
  );
}
