import { Button, Center, useToast } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import { loader } from '~/routes/_nav/settings/profile/route';
import { useEffect, useState } from 'react';

export function InviteParticipants() {
  const [clipboard, setClipboard] = useState<Clipboard | null>(null);
  useEffect(() => setClipboard(navigator.clipboard), []);
  const toast = useToast();
  const { url } = useLoaderData<typeof loader>();
  return (
    <Center
      justifyContent={'end'}
      padding={3}
      alignItems={'end'}
      boxSize={'full'}
    >
      <Button
        onClick={() => {
          clipboard?.writeText(url);
          toast({
            title: 'Ссылка скопирована.',
            status: 'success',
            duration: 3000,
          });
        }}
        colorScheme="gray"
        variant="outline"
        _hover={{ background: 'gray.300' }}
      >
        Пригласить участника
      </Button>
    </Center>
  );
}
