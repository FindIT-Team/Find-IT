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
import { useContext, useState } from 'react';
import { useRemixFormContext } from 'remix-hook-form';
import { AnimateLayout } from '../animate-layout';
import { Context } from '../context';
import { Schema } from '../schema';

enum Sex {
  MALE = 'Мужской',
  FEMALE = 'Женский',
  UNKNOWN = 'Не выбрано',
}

export function GenderField() {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { screenSearch, next, previous } = useContext(Context);
  const { setValue } = useRemixFormContext<Schema>();
  const [selected, setSelected] = useState<keyof typeof Sex>('UNKNOWN');

  const position = screenSearch('gender');

  setValue('profile.gender', selected);

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
          <Button width={'full'} variant={'outline'}>
            {Sex[selected]}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody padding={0}>
            <VStack spacing={0}>
              {Object.keys(Sex).map((key) =>
                key !== selected ? (
                  <Button
                    _first={{ borderTopRadius: 'md' }}
                    _last={{ borderBottomRadius: 'md', borderBottom: 'none' }}
                    key={key}
                    border={'none'}
                    borderBottom={'1px solid'}
                    borderColor={'gray.200'}
                    borderRadius={0}
                    variant={'outline'}
                    width={'full'}
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
        width={'full'}
        flexDirection={['column', 'column', 'row-reverse', 'row-reverse']}
        justifyContent={'space-between'}
        alignItems={'stretch'}
      >
        <Button
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
