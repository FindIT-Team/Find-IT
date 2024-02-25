import { Box, Button, Heading, HStack, Image, VStack } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';

const getLinks = (domain: string) => {
  return [
    {
      id: 'Apple',
      url: `http://api.${domain}/auth/oauth/apple-auth`,
      img: '/icons/auth/apple.svg',
    },
    {
      id: 'Google',
      url: `http://api.${domain}/auth/oauth/google-auth`,
      img: '/icons/auth/google.svg',
    },
    {
      id: 'Yandex',
      url: `http://api.${domain}/auth/oauth/yandex-auth`,
      img: '/icons/auth/yandex.svg',
    },
    {
      id: 'Github',
      url: `http://api.${domain}/auth/oauth/github-auth`,
      img: '/icons/auth/github.svg',
    },
  ];
};

export function ExternalAuth() {
  const linksType = getLinks('');
  const [links, setLinks] = useState<typeof linksType>([]);

  useEffect(() => {
    if (!('ENV' in window)) return;
    setLinks(getLinks((window.ENV as Record<string, string>).DOMAIN));
  }, []);

  return (
    <VStack>
      <Heading fontSize={'2xl'}>Войти с помощью</Heading>
      <HStack>
        {links.map(({ id, url, img }) => (
          <Button
            as={Link}
            key={id}
            to={url}
            padding={3}
            boxSize={'full'}
            variant={'outline'}
          >
            <Box boxSize={7}>
              <Image src={img} alt={id} boxSize={'full'} />
            </Box>
          </Button>
        ))}
      </HStack>
    </VStack>
  );
}
