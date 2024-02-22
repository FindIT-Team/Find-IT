import { Center, Text } from '@chakra-ui/react';
import { Link } from './link';

export function Footer() {
  return (
    <Center
      as={'footer'}
      pos={'fixed'}
      bottom={'1vh'}
      w={'100vw'}
      fontFamily={['IBM Plex Mono, monospace']}
      fontSize={'md'}
      userSelect={'none'}
    >
      <Text as={'h6'} opacity={0.4}>
        © Powered by{' '}
        <Link
          to={'https://github.com/FindIT-Team'}
          // bgGradient={'linear(to-l, #7928CA, #FF0080)'}
          // bgClip={'text'}
        >
          Find IT&apos;s team
        </Link>
      </Text>
    </Center>
  );
}
