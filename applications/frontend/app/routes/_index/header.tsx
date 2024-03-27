import { chakra } from '@chakra-ui/react';

export function Header() {
  return (
    <chakra.header>
      <chakra.h1
        fontFamily={['IBM Plex Mono, monospace']}
        fontSize={['2xl', '2xl', '3xl', '3xl']}
      >
        <chakra.span
          fontWeight={'700'}
          fontSize={['3xl', '3xl', '4xl', '4xl']}
          color={'indigo.700'}
        >
          Find IT
        </chakra.span>{' '}
        — первое кроссплатформенное приложение для{' '}
        <chakra.span color={'indigo.950'} fontWeight={'semibold'}>
          предпринимателей
        </chakra.span>
      </chakra.h1>
    </chakra.header>
  );
}
