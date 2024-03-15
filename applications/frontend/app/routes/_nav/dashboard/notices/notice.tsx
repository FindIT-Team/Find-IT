import { NoticeType } from '~/types/notice.type';
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { CloseButton } from '~/routes/_nav/dashboard/close-button';

export function Notice() {
  const notice: NoticeType = {
    id: 'adfjksajfaw',
    type: 'Security',
    message: 'Неизвестная точка входа',
    createdAt: new Date(2023),
  };

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
      <VStack
        alignItems={'flex-start'}
        height={'full'}
        justifyContent={'space-between'}
        gap={0}
        padding={0}
        flexGrow={1}
      >
        <Heading as={'h1'} fontSize={'sm'}>
          {notice.message}
        </Heading>
        <HStack>
          <Heading as={'h6'} fontSize={'xs'} fontWeight={550}>
            {notice.type}
          </Heading>
        </HStack>
      </VStack>
      <VStack
        alignItems={'flex-end'}
        height={'full'}
        justifyContent={'space-between'}
        gap={0}
        padding={0}
      >
        <CloseButton />
        <Text fontSize={'xs'}>
          {new Date(notice.createdAt).toLocaleString()}
        </Text>
      </VStack>
    </HStack>
  );
}
