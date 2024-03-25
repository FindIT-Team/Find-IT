import {
  Heading,
  HStack,
  Link,
  StackDivider,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { UserContext } from './user.context';
import { useContext } from 'react';

const translations = {
  email: {
    tag: 'E-mail',
    href: 'mailto:',
  },
  telegram: {
    tag: 'Telegram',
    href: 'https://t.me/',
  },
};

export function Contacts() {
  const { profile } = useContext(UserContext);

  return (
    <VStack alignItems={'flex-start'} flexGrow={1}>
      <Heading as={'h5'} fontSize={'xl'} fontWeight={'medium'}>
        Контакты:
      </Heading>
      <VStack width={'full'} divider={<StackDivider />} spacing={2}>
        {Object.entries(profile.contacts)
          .filter((value) => value[1])
          .map((contact) => (
            <Link
              width={'full'}
              href={
                translations[contact[0] as keyof typeof translations].href +
                contact[1]
              }
            >
              <HStack
                key={contact[0]}
                justifyContent={'space-between'}
                width={'full'}
                spacing={10}
              >
                <Text>{contact[1]}</Text>
                <Tag variant={'subtle'}>
                  {translations[contact[0] as keyof typeof translations].tag}
                </Tag>
              </HStack>
            </Link>
          ))}
        {profile.extraSkills.map((extraSkill) => (
          <HStack
            key={extraSkill.name}
            justifyContent={'space-between'}
            width={'full'}
            spacing={10}
          >
            <Text>{extraSkill.name}</Text>
            <Tag variant={'outline'}>{extraSkill.value}</Tag>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
}
