import {
  Heading,
  HStack,
  StackDivider,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '@/entities/users';

const translations = {
  backend: 'Бэкенд',
  frontend: 'Фронтенд',
  devOps: 'DevOps',
  projectManagement: 'Проектный менеджмент',
  qa: 'Тестирование',
  machineLearning: 'Машинное обучение',
};

export function Skills() {
  const { profile } = useContext(UserContext);

  return (
    <VStack alignItems={'flex-start'}>
      <Heading as={'h5'} fontSize={'xl'} fontWeight={'medium'}>
        Навыки:
      </Heading>
      <VStack divider={<StackDivider />} spacing={2}>
        {Object.entries(profile.skills).map((skill) => (
          <HStack
            key={skill[0]}
            justifyContent={'space-between'}
            width={'full'}
            spacing={10}
          >
            <Text>{translations[skill[0] as keyof typeof translations]}</Text>
            <Tag variant={'outline'}>{skill[1]}</Tag>
          </HStack>
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
