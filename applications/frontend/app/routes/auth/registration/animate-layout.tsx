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
  vStackProps,
}: {
  children: React.ReactNode;
  position: number;
  vStackProps?: ChakraProps & Record<string, unknown>;
}) {
  const { screenVariants, rightDirection, step } = useContext(Context);
  return (
    <AnimatePresence>
      {step === position && (
        <ChakraBox
          variants={screenVariants}
          initial={rightDirection ? 'rightHidden' : 'leftHidden'}
          animate={'show'}
          exit={rightDirection ? 'leftHidden' : 'rightHidden'}
        >
          <Center w={'100vw'} h={'100vh'} position={'absolute'}>
            <VStack
              width={['90%', '60%', '35%', '35%']}
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
