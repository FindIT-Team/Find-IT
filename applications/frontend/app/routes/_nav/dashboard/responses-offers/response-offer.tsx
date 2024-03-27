import { Button, Heading, HStack, VStack } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import {
  RiCheckLine,
  RiCloseLine,
  RiStarFill,
  RiTimeLine,
  RiWallet3Fill,
} from 'react-icons/ri';
import { useContext } from 'react';
import { ResponseOfferContext } from '~/routes/_nav/dashboard/responses-offers/response-offer.context';
import { FaUsers } from 'react-icons/fa';

export function ResponseOffer() {
  const { status, project } = useContext(ResponseOfferContext);

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
      <HStack flexGrow={1} spacing={3}>
        <Icon as={RiTimeLine} />
        <VStack alignItems={'flex-start'} flexGrow={1}>
          <Heading as={'h1'} fontSize={'sm'}>
            {(status === 'INVITED' ? 'Оффер по проекту' : 'Отклик по проекту') +
              ' «' +
              project.title +
              '»'}
          </Heading>
          <HStack spacing={3.5}>
            <Heading
              as={'h6'}
              color={'gray.600'}
              fontSize={'xs'}
              fontWeight={'medium'}
            >
              {project.users[0]
                ? project.users[0].user.username
                : 'Не назначен'}
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
                }).format(project._count.users)}
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
                  project.rating.length > 0
                    ? project.rating
                        .map(({ mark }: { mark: number }) => mark)
                        .reduce(
                          (previousValue: number, currentValue: number) =>
                            (previousValue += currentValue),
                        ) / project.rating.length
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
                {project.budget
                  ? Intl.NumberFormat(navigator.language, {
                      style: 'currency',
                      currency: project.budget.currency,
                      notation: 'compact',
                    }).format(project.budget.value)
                  : 'Не указан'}
              </Heading>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
      <HStack alignItems={'flex-end'} spacing={0}>
        <Button size={'md'} variant={'outline'} padding={0} border={'none'}>
          <Icon as={RiCheckLine} />
        </Button>
        <Button size={'md'} variant={'outline'} padding={0} border={'none'}>
          <Icon as={RiCloseLine} />
        </Button>
      </HStack>
    </HStack>
  );
}
