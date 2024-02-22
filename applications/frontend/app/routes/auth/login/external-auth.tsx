import { Button, Heading, HStack, Image, VStack } from '@chakra-ui/react';
import { Link } from '~/components/link';

const externalAuth = [
  {
    id: 'Apple',
    url: `api.${process.env.DOMAIN}/auth/oauth/apple-auth`,
    img: '/icons/auth/apple.svg',
  },
  {
    id: 'Google',
    url: `api.${process.env.DOMAIN}/auth/oauth/google-auth`,
    img: '/icons/auth/google.svg',
  },
  {
    id: 'Yandex',
    url: `api.${process.env.DOMAIN}/auth/oauth/yandex-auth`,
    img: '/icons/auth/yandex.svg',
  },
  {
    id: 'Github',
    url: `api.${process.env.DOMAIN}/auth/oauth/github-auth`,
    img: '/icons/auth/github.svg',
  },
];

export function ExternalAuth() {
  return (
    <VStack>
      <Heading fontSize={'2xl'}>Войти с помощью</Heading>
      <HStack>
        {externalAuth.map(({ id, url, img }) => (
          <Button key={id} p={3} height={'full'}>
            <Link to={url} w={7} h={7}>
              <Image src={img} alt={id} w={'full'} h={'full'} />
            </Link>
          </Button>
        ))}
      </HStack>
    </VStack>
  );
}
