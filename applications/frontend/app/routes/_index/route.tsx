import type { MetaFunction } from '@remix-run/node';
import { Footer } from '~/components/footer';
import { Box, Center, Flex } from '@chakra-ui/react';
import { Logo } from '~/components/svg/logo';
import { RadialBackground } from '~/components/radial-background';
import { Header } from '~/routes/_index/header';
import { Description } from '~/routes/_index/description';
import { StartButton } from '~/routes/_index/start-button';

export const meta: MetaFunction = () => {
  return [{ title: 'FindIT' }];
};

/**
 * 320px <
 * < 768px
 * @constructor
 */

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
        <Box width={['90%', '50%', '40%', '40%']}>
          <Logo />
        </Box>
      </Flex>
      <Center
        as={'main'}
        width={['100%', '100%', '60%', '50%', '40%', '30%']}
        height={['100vh']}
        justifyContent={'space-around'}
        alignItems={['center', 'center', 'flex-start', 'flex-start']}
        px={'10%'}
        py={'10%'}
        flexDirection={'column'}
        pt={['20%', '20%', '0', '0']}
      >
        <Header />
        <Description />
        <StartButton />
      </Center>
      <Footer />
    </>
  );
}
