import type { MetaFunction } from '@remix-run/node';
import { Footer } from '~/components/footer';
import { Box, Center } from '@chakra-ui/react';
import { LogoSvg } from '~/components/svg/logo.svg';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Page() {
  return (
    <>
      <Center
        as={'header'}
        pos={'fixed'}
        width={'100%'}
        justifyContent={['center', 'flex-end', 'flex-end']}
        padding={5}
      >
        <Box width={['90%', '60%', '60%', '40%']}>
          <LogoSvg />
        </Box>
      </Center>
      <main></main>
      <Footer />
    </>
  );
}
