import { NoticeType } from '~/types/notice.type';
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { CloseButton } from '~/routes/_nav/dashboard/close-button';
import { useEffect, useState } from 'react';

export function Notice({ notice }: { notice: NoticeType }) {
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
        {notice.createdAt && (
          <Text fontSize={'xs'}>
            {new Date(notice.createdAt).toLocaleTimeString()}
          </Text>
        )}
      </VStack>
    </HStack>
  );
}
