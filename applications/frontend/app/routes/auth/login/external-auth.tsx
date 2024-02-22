import { Box, Button, Heading, HStack, Image, VStack } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

const getLinks = (domain: string) => {
  return [
    {
      id: 'Apple',
      url: `api.${domain}/auth/oauth/apple-auth`,
      img: '/icons/auth/apple.svg',
    },
    {
      id: 'Google',
      url: `api.${domain}/auth/oauth/google-auth`,
      img: '/icons/auth/google.svg',
    },
    {
      id: 'Yandex',
      url: `api.${domain}/auth/oauth/yandex-auth`,
      img: '/icons/auth/yandex.svg',
    },
    {
      id: 'Github',
      url: `api.${domain}/auth/oauth/github-auth`,
      img: '/icons/auth/github.svg',
    },
  ];
};

export function ExternalAuth() {
  let externalAuth = getLinks('');
  if (typeof window !== 'undefined' && 'ENV' in window) {
    externalAuth = getLinks((window.ENV as Record<string, string>).DOMAIN);
  }

  return (
    <VStack>
      <Heading fontSize={'2xl'}>Войти с помощью</Heading>
      <HStack>
        {externalAuth.map(({ id, url, img }) => (
          <Button as={Link} key={id} to={url} p={3} w={'full'} h={'full'}>
            <Box w={7} h={7}>
              <Image src={img} alt={id} w={'full'} h={'full'} />
            </Box>
          </Button>
        ))}
      </HStack>
    </VStack>
  );
}
