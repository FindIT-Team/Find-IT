import { Box, Button, Heading, HStack, Image, VStack } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';

export function ExternalAuth() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!('ENV' in window)) return;
    setUrl((window.ENV as Record<string, string>).API_URL);
  }, []);

  const links = [
    {
      id: 'Apple',
      url: `${url}/auth/oauth/apple-auth`,
      img: '/icons/auth/apple.svg',
    },
    {
      id: 'Google',
      url: `${url}/auth/oauth/google-auth`,
      img: '/icons/auth/google.svg',
    },
    {
      id: 'Yandex',
      url: `${url}/auth/oauth/yandex-auth`,
      img: '/icons/auth/yandex.svg',
    },
    {
      id: 'Github',
      url: `${url}/auth/oauth/github-auth`,
      img: '/icons/auth/github.svg',
    },
  ];

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
