import { Heading, HStack, Spacer } from '@chakra-ui/react';
import { Contact } from '~/routes/_nav/profile/contact';

export function Contacts() {
  return (
    <HStack width={900}>
      <Heading fontSize={'xl'}>
        Контакты:
        <Spacer height={5} />
        {Array(6)
          .fill(null)
          .map((v, i) => (
            <Contact key={i} />
          ))}
      </Heading>
    </HStack>
  );
}
