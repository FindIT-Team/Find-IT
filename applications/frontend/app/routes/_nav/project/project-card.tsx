import {
  Button,
  Heading,
  HStack,
  Image,
  Box,
  Text,
  useDisclosure,
  VStack,
  Textarea,
  Grid,
  GridItem,
  Stack,
  Card,
  CardBody,
  ButtonGroup,
  Divider,
  CardFooter,
  grid,
} from '@chakra-ui/react';
import { IconBase } from 'react-icons';
import { PiNumberCircleEight } from 'react-icons/pi';
import { VscTable } from 'react-icons/vsc';
import { Link } from '@remix-run/react';

export function ProjectCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card maxW="sm" width={400}>
      <CardBody>
        <VStack mt="2" alignItems={'flex-start'}>
          <Heading size="md">Колян</Heading>
          <HStack>
            <Box backgroundColor={'gray.300'} height={200} width={250}>
              <Text>Вроде уже по кайфу, но вот обрезка текста хромает</Text>
            </Box>
            <VStack alignItems={'flex-end'}>
              <Text>15</Text>
              <Text>1500</Text>
              <Text>15</Text>
            </VStack>
            <VStack>
              <Text>👤</Text>
              <Text>$</Text>
              <Text>👤</Text>
            </VStack>
          </HStack>
        </VStack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button
            as={Link}
            to={'/project'}
            variant="solid"
            colorScheme="purple"
          >
            Посмотреть
          </Button>
          <Button variant="solid" colorScheme="green">
            Откликнуться
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
