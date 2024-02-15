import { Heading, chakra } from '@chakra-ui/react';

export function Header() {
  return (
    <chakra.header>
      <Heading as={'h1'} fontFamily={['IBM Plex Mono, monospace']}>
        <span>Find IT</span> — первое кроссплатформенное приложение для{' '}
        <span>предпринимателей</span>
      </Heading>
    </chakra.header>
  );
}
