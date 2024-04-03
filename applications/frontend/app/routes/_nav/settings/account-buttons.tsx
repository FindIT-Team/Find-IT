import { Button, Text, VStack } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';

export function AccountButtons() {
  return (
    <VStack width={'80%'}>
      <Button
        width={'full'}
        justifyContent={'space-between'}
        boxSize={'full'}
        alignItems={'end'}
        padding={3}
        variant="outline"
        _hover={{ background: 'gray.300' }}
      >
        <Icon as={FaGoogle} />
        <Text>Google</Text>
        <Icon as={RiCloseLine} />
      </Button>
      <Button
        width={'full'}
        justifyContent={'space-between'}
        boxSize={'full'}
        alignItems={'end'}
        padding={3}
        variant="outline"
        _hover={{ background: 'gray.300' }}
      >
        <Icon as={FaGithub} />
        <Text>GitHub</Text>
        <Icon as={RiCloseLine} />
      </Button>
    </VStack>
  );
}
