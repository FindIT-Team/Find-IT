import { Center, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link as RemixLink } from '@remix-run/react';

export function Footer() {
  return (
    <Center
      as={'footer'}
      position={'fixed'}
      bottom={'1vh'}
      w={'full'}
      fontFamily={['IBM Plex Mono, monospace']}
      fontSize={'md'}
      userSelect={'none'}
    >
      <Text as={'h6'} opacity={0.4}>
        © Powered by{' '}
        <ChakraLink
          as={RemixLink}
          to={'https://github.com/FindIT-Team'}
          // bgGradient={ 'linear(to-l, #7928CA, #FF0080)' }
          // bgClip={ 'text' }
        >
          Find IT&apos;s team
        </ChakraLink>
      </Text>
    </Center>
  );
}
