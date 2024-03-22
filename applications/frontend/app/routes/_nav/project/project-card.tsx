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
            <Box
              overflow={'hidden'}
              backgroundColor={'gray.300'}
              height={200}
              width={250}
            >
              <Text whiteSpace={'hidden'}>
                Описание проекта - это высокоуровневый обзор того, почему вы
                выполняете проект. В документе объясняются цели проекта и его
                основные качества. Думайте об этом как о презентации в лифте,
                которая фокусируется на том, что и почему, не вникая в то, как
                это делается. Обычно вы составляете описание проекта на ранней
                стадии, на этапе инициирования проекта в жизненном цикле
                управления проектом.
              </Text>
            </Box>
            <VStack justifyContent={'flex-center'}>
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
