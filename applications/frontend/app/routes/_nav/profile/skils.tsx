import { Heading, Spacer, VStack } from '@chakra-ui/react';
import { Skill } from '~/routes/_nav/profile/skill';

export function Skills() {
  return (
    <VStack justifyContent={'flex-start'} paddingX={3}>
      <Heading fontSize={'xl'}>Навыки: </Heading>
      <Spacer height={5} />

      {Array(6)
        .fill(null)
        .map((v, i) => (
          <Skill key={i} />
        ))}
    </VStack>
  );
}
