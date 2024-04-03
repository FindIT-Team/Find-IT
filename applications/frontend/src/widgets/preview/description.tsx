import { chakra } from '@chakra-ui/react';

export function Description() {
  return (
    <chakra.p
      fontFamily={['IBM Plex Mono, monospace']}
      letterSpacing={-0.5}
      fontSize={['2xl', '2xl', '3xl', '3xl']}
    >
      Теперь вы точно сможете найти своих единомышленников для своих IT идей
    </chakra.p>
  );
}
