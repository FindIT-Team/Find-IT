import { Heading, Spacer, VStack } from '@chakra-ui/react';
import { Skill } from './skill';

export function Skills({skills}: {skills: Record<string, string>}) {
  return (
    <VStack justifyContent={'flex-start'} paddingX={3}>
      <Heading fontSize={'xl'}>Навыки: </Heading>
      <Spacer height={5} />
      {Object.entries(skills).map((skill) => 
          <Skill key={skill[0]} skill={skill} />
        )}
    </VStack>
  );
}
