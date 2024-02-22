import { useContext, useState } from 'react';
import { Context } from '~/routes/auth/registration/context';
import { AnimateLayout } from '~/routes/auth/registration/animate-layout';
import {
  Button,
  Heading,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRemixFormContext } from 'remix-hook-form';
import { Schema } from '~/routes/auth/registration/schema';

enum Sex {
  Male = 'Мужской',
  Female = 'Женский',
  Unselected = 'Не выбрано',
}

export function GenderField() {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { screenSearch, next, previous } = useContext(Context);
  const { setValue } = useRemixFormContext<Schema>();
  const [selected, setSelected] = useState<keyof typeof Sex>('Unselected');
  const isTouched = selected !== 'Unselected';

  const position = screenSearch('gender');

  if (selected !== 'Unselected') setValue('gender', selected);

  return (
    <AnimateLayout position={position}>
      <Heading>Какого ты пола?</Heading>
      <Popover
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        placement={'bottom'}
      >
        <PopoverTrigger>
          <Button width={'100%'} variant={'outline'}>
            {Sex[selected]}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody padding={0}>
            <VStack spacing={0}>
              {Object.keys(Sex).map((key) =>
                key !== 'Unselected' ? (
                  <Button
                    _first={{ borderTopRadius: 'md' }}
                    _last={{ borderBottomRadius: 'md', borderBottom: 'none' }}
                    key={key}
                    border={'none'}
                    borderBottom={'1px solid'}
                    borderColor={'gray.200'}
                    borderRadius={0}
                    variant={'outline'}
                    width={'100%'}
                    onClick={() => {
                      setSelected(key as keyof typeof Sex);
                      onClose();
                    }}
                  >
                    {Sex[key as keyof typeof Sex]}
                  </Button>
                ) : null,
              )}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <HStack
        width={'100%'}
        flexDirection={['column', 'column', 'row-reverse', 'row-reverse']}
        justifyContent={'space-between'}
        alignItems={'stretch'}
      >
        <Button
          isDisabled={!isTouched}
          flexGrow={1}
          colorScheme={'blue'}
          type={'button'}
          onClick={() => next(position + 1)}
        >
          Продолжить
        </Button>
        <Button type={'button'} onClick={() => previous(position - 1)}>
          Назад
        </Button>
      </HStack>
    </AnimateLayout>
  );
}
