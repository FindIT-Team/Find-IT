import { NoticeType } from '~/types/notice.type';
import { CloseButton, Heading, HStack, VStack } from '@chakra-ui/react';

export function Notice() {
  const notice: NoticeType = {
    id: 'adfjksajfaw',
    type: 'Security',
    message: 'Неизвестная точка входа',
    createdAt: new Date(),
  };

  return (
    <HStack width={'full'} paddingX={3} paddingY={1}>
      <VStack alignItems={'flex-start'} flexGrow={1}>
        <Heading as={'h1'} fontSize={'sm'}>
          {notice.message}
        </Heading>
        <Heading as={'h6'} fontSize={'xs'}>
          {notice.type}
        </Heading>
      </VStack>
      <VStack alignItems={'flex-end'}>
        <CloseButton size={'sm'} />
        <Heading as={'h6'} fontSize={'xs'}>
          {new Date(notice.createdAt).toLocaleString()}
        </Heading>
      </VStack>
    </HStack>
  );
}
