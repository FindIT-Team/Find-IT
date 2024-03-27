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
import { ProjectDto } from '../dashboard/projects/project.dto';
import { Icon } from '@chakra-ui/icons';
import { FaUsers } from 'react-icons/fa';
import { RiStarFill, RiWallet3Fill } from 'react-icons/ri';

export default function Page() {
  const { budget, users, rating, _count }: ProjectDto = {
    _count: { users: 0 },
    budget: { currency: 'RUB', value: 0 },
    description: '',
    id: '',
    rating: [{ mark: 0 }],
    slug: '',
    title: '',
    updatedAt: '',
    users: [{ user: { username: '' } }],
  };

  return (
    <Card maxW="sm">
      <CardBody>
        <VStack mt="2" alignItems={'flex-start'}>
          <Heading size="md">Колян</Heading>
          <HStack>
            <Box backgroundColor={'gray.300'} height={200} width={250}>
              <Text>
                Вроде уже по кайфу, но вот обрезка текста хромает пока
              </Text>
            </Box>
            <VStack spacing={3.5}>
              <Heading
                as={'h6'}
                color={'gray.600'}
                fontSize={'xs'}
                fontWeight={'medium'}
              >
                {users[0] ? users[0].user.username : 'Не назначен'}
              </Heading>
              <HStack
                spacing={0.5}
                width={'full'}
                justifyContent={'justify-between'}
              >
                <Icon as={FaUsers} boxSize={3} color={'gray.600'} />
                <Heading
                  as={'h6'}
                  color={'gray.600'}
                  fontSize={'xs'}
                  fontWeight={'medium'}
                >
                  {Intl.NumberFormat(navigator.language, {
                    style: 'decimal',
                    notation: 'compact',
                  }).format(_count.users)}
                </Heading>
              </HStack>

              <HStack
                spacing={0.5}
                width={'full'}
                justifyContent={'justify-between'}
              >
                <Icon as={RiStarFill} boxSize={3} color={'gray.600'} />
                <Heading
                  as={'h6'}
                  color={'gray.600'}
                  fontSize={'xs'}
                  fontWeight={'medium'}
                >
                  {Intl.NumberFormat(navigator.language, {
                    style: 'decimal',
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }).format(
                    rating.length > 0
                      ? rating
                          .map(({ mark }: { mark: number }) => mark)
                          .reduce(
                            (previousValue: number, currentValue: number) =>
                              (previousValue += currentValue),
                          ) / rating.length
                      : 0,
                  )}
                </Heading>
              </HStack>

              <HStack
                spacing={0.5}
                width={'full'}
                justifyContent={'justify-between'}
              >
                <Icon as={RiWallet3Fill} boxSize={3} color={'gray.600'} />
                <Heading
                  as={'h6'}
                  color={'gray.600'}
                  fontSize={'xs'}
                  fontWeight={'medium'}
                >
                  {budget
                    ? Intl.NumberFormat(navigator.language, {
                        style: 'currency',
                        currency: budget.currency,
                        notation: 'compact',
                      }).format(budget.value)
                    : 'Не указан'}
                </Heading>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button variant="solid" colorScheme="purple">
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
