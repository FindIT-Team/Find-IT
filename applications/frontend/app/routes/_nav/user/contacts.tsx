import { Heading, HStack, Spacer } from '@chakra-ui/react';
import { Contact } from '~/routes/_nav/user/contact';

export function Contacts({ contacts }: { contacts: Record<string, string> }) {
  return (
    <HStack width={900}>
      <Heading fontSize={'xl'}>
        Контакты:
        <Spacer height={5} />
        {Object.entries(contacts).map((contact) => (
          <Contact key={contact[0]} contact={contact} />
        ))}
      </Heading>
    </HStack>
  );
}
