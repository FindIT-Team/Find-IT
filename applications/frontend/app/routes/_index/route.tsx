import type { MetaFunction } from '@remix-run/node';
import { Footer } from '~/components/footer';
import { Box, Flex, Center } from '@chakra-ui/react';
import { Logo } from '~/components/svg/logo';
import { RadialBackground } from '~/components/radial-background';
import { Header } from '~/routes/_index/header';
import { Description } from '~/routes/_index/description';

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
        <Box width={['90%', '60%', '60%', '40%']}>
          <Logo />
        </Box>
      </Flex>
      <Center as={'main'} width={'35%'} justifyContent={'flex-start'} px={'10%'} py={'5%'} >
        <Header />
        <Description />
      </Center>
      <Footer />
    </>
  );
}
