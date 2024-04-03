import { Box, Center, Flex } from '@chakra-ui/react';
import type { MetaFunction } from '@remix-run/node';
import { Preview } from '@/widgets/preview';
import { PreviewBackground } from '@/widgets/preview-background';
import { LogoSvg } from '@/shared';

export const meta: MetaFunction = () => [{ title: 'FindIT' }];

export default function Home() {
  return (
    <>
      <PreviewBackground />
      <Flex
        pos={['initial', 'initial', 'fixed', 'fixed']}
        as={'header'}
        width={'full'}
        justifyContent={['center', 'flex-end', 'flex-end']}
        padding={5}
      >
        <Box width={['90%', '50%', '40%', '40%']}>
          <LogoSvg />
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
        <Preview />
      </Center>
    </>
  );
}
