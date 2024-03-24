import { Button, Heading, HStack, VStack } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '~/routes/_nav/dashboard/projects/project.context';
import { Link } from '@remix-run/react';
import { Icon } from '@chakra-ui/icons';
import { RiEyeLine, RiStarFill, RiWallet3Fill } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';

export function Project() {
  const { title, budget, users, slug, rating, _count } =
    useContext(ProjectContext);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  return (
    <HStack
      width={'full'}
      paddingX={3}
      paddingY={1.5}
      background={'white'}
      borderBottom={'1px solid'}
      borderColor={'gray.200'}
      _last={{ border: 'none' }}
    >
      <VStack alignItems={'flex-start'} flexGrow={1}>
        <Heading as={'h1'} fontSize={'sm'}>
          {title}
        </Heading>
        <HStack spacing={3.5}>
          <Heading
            as={'h6'}
            color={'gray.600'}
            fontSize={'xs'}
            fontWeight={'medium'}
          >
            {users[0] ? users[0].user.username : 'Не назначен'}
          </Heading>
          <HStack spacing={0.5}>
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

          <HStack spacing={0.5}>
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

          <HStack spacing={0.5}>
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
        </HStack>
      </VStack>
      <VStack alignItems={'flex-end'}>
        <Button
          as={Link}
          to={`/projects/${slug}`}
          size={'md'}
          variant={'outline'}
          padding={0}
          border={'none'}
        >
          <Icon as={RiEyeLine} />
        </Button>
      </VStack>
    </HStack>
  );
}
