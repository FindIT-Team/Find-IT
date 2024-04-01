import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { CloseButton } from '~/routes/_nav/dashboard/close-button';
import { useContext } from 'react';
import { NoticeContext } from '~/routes/_nav/dashboard/notices/notice.context';
import useLanguage from '~/components/hooks/useLanguage';

export function Notice() {
  const { message, type, createdAt } = useContext(NoticeContext);

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
      <VStack
        alignItems={'flex-start'}
        height={'full'}
        justifyContent={'space-between'}
        gap={0}
        padding={0}
        flexGrow={1}
      >
        <Heading as={'h1'} fontSize={'sm'}>
          {message}
        </Heading>
        <HStack>
          <Heading as={'h6'} fontSize={'xs'} fontWeight={550}>
            {type}
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
          {new Date(createdAt).toLocaleDateString(language)}
        </Text>
      </VStack>
    </HStack>
  );
}
