import {
  Button,
  Heading,
  HStack,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

export function UserCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Button
      onClick={onOpen}
      border={'1px solid'}
      borderColor={'gray.300'}
      borderRadius={'lg'}
      padding={4}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
      width={475}
      height={260}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>NikName</ModalHeader>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
      <HStack>
        <VStack alignItems={'flex-start'}>
          <Heading fontSize={'xl'}>{/*Здесь UserName*/}</Heading>
          <Image src={'thanks.jpeg'} boxSize={40} borderRadius={'lg'} />
          <Heading fontSize={'xl  '}>Кирил Иванович</Heading>
        </VStack>
        <HStack alignItems={'flex-start'} justifyContent={'flex-start'}>
          <VStack alignItems={'flex-start'} justifyContent={'flex-start'}>
            <Heading fontSize={'xl'}>Проекты</Heading>
            <Heading fontSize={'md'}>Участник:</Heading>
            <Heading fontSize={'md'}>Основал:</Heading>
          </VStack>
        </HStack>
      </HStack>
    </Button>
  );
}

// ник;
// фио;
// ава;
// кол во проектов
// колво созданных проектов
