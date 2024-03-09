import { ProjectType } from '~/types/project.type';
import {
  CloseButton,
  Heading,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { RiCheckFill, RiTimeLine } from 'react-icons/ri';

export function ResponseOffer() {
  const responseOffer: ProjectType = {
    id: 'pudge21',
    title: '21pudge',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const status = 'userInvited';

  return (
    <HStack width={'full'} paddingX={3} paddingY={1}>
      <VStack alignItems={'flex-start'} flexGrow={1}>
        <Heading>
          <Heading>
            <Heading>
              <Icon as={RiTimeLine} boxSize={6} />
              <Heading as={'h1'} fontSize={'sm'}>
                {status === 'userRequested'
                  ? `Отклик по проекту "${responseOffer.title}"`
                  : status === 'userInvited'
                    ? `Оффер по проекту "${responseOffer.title}"`
                    : ''}
              </Heading>
              <Heading>
                {status === 'userRequested' ? (
                  <></>
                ) : status === 'userInvited' ? (
                  <>
                    <Heading as={'h6'} fontSize={'xs'}>
                      {responseOffer.budget}
                    </Heading>
                    <Heading as={'h6'} fontSize={'xs'}>
                      Owner
                    </Heading>
                  </>
                ) : (
                  <></>
                )}
              </Heading>
            </Heading>
          </Heading>
          <HStack flexDirection={'row'}>
            {status === 'userInvited' ? (
              <>
                <IconButton
                  aria-label={'Approve'}
                  icon={<RiCheckFill />}
                  boxSize={6}
                  _hover={{ bg: 'gray.200' }}
                />
                <CloseButton size={'sm'} _hover={{ bg: 'gray.200' }} />
              </>
            ) : (
              <></>
            )}
          </HStack>
        </Heading>
      </VStack>
    </HStack>
  );
}
