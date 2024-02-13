import { Box, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const animationKeyframes = keyframes(`
  0% { opacity: 1 }
  50% { opacity: 0.5 }
  100% { opacity: 1 }
`);

const animation = `${animationKeyframes} 2s ease-in-out infinite`;

export function RadialBackground() {
  return (
    <Box as={motion.div} animation={animation}>
      <Box
        pos={'fixed'}
        width={'100%'}
        height={'100%'}
        opacity={0.6}
        bgGradient={
          'radial-gradient(71.57% 96.06% at 63.75% 43.36%, rgba(132, 23, 249, 1) 0%, rgba(0, 0, 0, 0.00) 100%), #FFF;'
        }
      />
    </Box>
  );
}
