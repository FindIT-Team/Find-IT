import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';

export function ProjectCard() {
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
