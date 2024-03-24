import { chakra, Icon } from '@chakra-ui/react';
import { RiCloseLine } from 'react-icons/ri';

export function CloseButton() {
  return (
    <chakra.button
      boxSize={4}
      _hover={{ background: 'gray.200' }}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={'sm'}
    >
      <Icon as={RiCloseLine} boxSize={4} />
    </chakra.button>
  );
}
