import { AnimatePresence, isValidMotionProp, motion } from 'framer-motion';
import {
  Center,
  chakra,
  ChakraProps,
  shouldForwardProp,
  VStack,
} from '@chakra-ui/react';
import { Context } from '~/routes/auth/registration/context';
import React, { useContext } from 'react';

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop: string) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export function AnimateLayout({
  children,
  position,
  animateProps,
  vStackProps,
}: {
  children: React.ReactNode;
  position: number;
  animateProps?: Record<string, () => void>;
  vStackProps?: ChakraProps & Record<string, unknown>;
}) {
  const { screenVariants, rightDirection, step } = useContext(Context);
  return (
    <AnimatePresence {...animateProps}>
      {step === position && (
        <ChakraBox
          variants={screenVariants}
          initial={rightDirection ? 'rightHidden' : 'leftHidden'}
          animate={'show'}
          exit={rightDirection ? 'leftHidden' : 'rightHidden'}
        >
          <Center width={'100vw'} height={'100vh'} position={'absolute'}>
            <VStack
              width={['90%', '60%', '40%', '40%']}
              spacing={2}
              textAlign={'center'}
              {...vStackProps}
              userSelect={'none'}
            >
              {children}
            </VStack>
          </Center>
        </ChakraBox>
      )}
    </AnimatePresence>
  );
}
