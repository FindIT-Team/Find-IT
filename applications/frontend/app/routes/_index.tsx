import type { MetaFunction } from '@remix-run/node';
import { Footer } from '~/components/footer';
import { Box, Flex } from '@chakra-ui/react';
import { LogoSvg } from '~/components/svg/logo.svg';
import { RadialBackground } from '~/components/radial-background';

export const meta: MetaFunction = () => {
  return [{ title: 'FindIT' }];
};

export default function Page() {
  return (
    <>
      <RadialBackground />
      <Flex
        // pos={['initial', 'fixed', 'fixed', 'fixed']}
        as={'header'}
        pos={'fixed'}
        width={'100%'}
        justifyContent={['center', 'flex-end', 'flex-end']}
        padding={5}
      >
        <Box width={['90%', '60%', '60%', '40%']}>
          <LogoSvg />
        </Box>
      </Flex>
      <main></main>
      <Footer />
    </>
  );
}
