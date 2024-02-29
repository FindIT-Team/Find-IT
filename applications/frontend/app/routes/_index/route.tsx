import type { MetaFunction } from '@remix-run/node';
import { Box, Center, Flex } from '@chakra-ui/react';
import { Logo } from '~/components/svg/logo';
import { RadialBackground } from '~/components/radial-background';
import { Header } from '~/routes/_index/header';
import { Description } from '~/routes/_index/description';
import { StartButton } from '~/routes/_index/start-button';

export const meta: MetaFunction = () => [{ title: 'FindIT' }];

export default function Page() {
  return (
    <>
      <RadialBackground />
      <Flex
        pos={['initial', 'initial', 'fixed', 'fixed']}
        as={'header'}
        width={'full'}
        justifyContent={['center', 'flex-end', 'flex-end']}
        padding={5}
      >
        <Box width={['90%', '50%', '40%', '40%']}>
          <Logo />
        </Box>
      </Flex>
      <Center
        as={'main'}
        width={['full', 'full', '60%', '50%', '40%', '40%']}
        height={['auto', 'auto', '100vh', '100vh']}
        justifyContent={[
          'space-between',
          'space-between',
          'space-around',
          'space-around',
        ]}
        alignItems={['center', 'center', 'flex-start', 'flex-start']}
        px={['10%', '20%', '10%', '10%', '10%', '10%']}
        py={'10%'}
        flexDirection={'column'}
        gap={[16, 16, 16, 20]}
        userSelect={'none'}
      >
        <Header />
        <Description />
        <StartButton />
      </Center>
    </>
  );
}
