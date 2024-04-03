import { Icon } from '@chakra-ui/icons';
import { Button, Heading, HStack, VStack } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { useContext } from 'react';
import { FaUsers } from 'react-icons/fa';
import { RiEyeLine, RiStarFill, RiWallet3Fill } from 'react-icons/ri';
import { IconWithValue, useLanguage } from '@/shared';
import { ProjectContext } from '..';

export function ProjectRow() {
  const { title, budget, users, slug, rating, _count } =
    useContext(ProjectContext);

  const language = useLanguage();

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
          <IconWithValue
            icon={FaUsers}
            boxSize={3}
            fontSize={'xs'}
            spacing={0.5}
          >
            {Intl.NumberFormat(language, {
              style: 'decimal',
              notation: 'compact',
            }).format(_count.users)}
          </IconWithValue>

          <IconWithValue
            icon={RiStarFill}
            boxSize={3}
            fontSize={'xs'}
            spacing={0.5}
          >
            {Intl.NumberFormat(language, {
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
          </IconWithValue>

          <IconWithValue
            icon={RiWallet3Fill}
            boxSize={3}
            fontSize={'xs'}
            spacing={0.5}
          >
            {budget
              ? Intl.NumberFormat(language, {
                  style: 'currency',
                  currency: budget.currency,
                  notation: 'compact',
                }).format(budget.value)
              : 'Не указан'}
          </IconWithValue>
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
