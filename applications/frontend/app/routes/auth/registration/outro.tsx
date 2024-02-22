import { AnimateLayout } from '~/routes/auth/registration/animate-layout';
import { Context } from '~/routes/auth/registration/context';
import { useContext } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useRemixFormContext } from 'remix-hook-form';
import { Schema } from '~/routes/auth/registration/schema';

export function Outro() {
  const { screenSearch, next, previous } = useContext(Context);
  const { register, formState } = useRemixFormContext<Schema>();
  const error: string = formState.errors.consent?.message as string;
  const isTouched = formState.touchedFields.consent;

  const position = screenSearch('outro');

  return (
    <AnimateLayout position={position}>
      <Heading>Поставь галочку ниже и можешь начинать</Heading>
      <FormControl isInvalid={!!error}>
        <Checkbox {...register('consent')}>
          Я даю согласие на обработку персональных данных
        </Checkbox>
        {error ? (
          <FormErrorMessage>{error}</FormErrorMessage>
        ) : (
          <FormHelperText
            fontFamily={['IBM Plex Mono, monospace']}
            color={'transparent'}
          >
            Null
          </FormHelperText>
        )}
      </FormControl>
      <VStack>
        <HStack
          width={'100%'}
          flexDirection={['column', 'column', 'row-reverse', 'row-reverse']}
          justifyContent={'space-between'}
          alignItems={'stretch'}
        >
          <Button
            isDisabled={!!error || !isTouched}
            flexGrow={1}
            colorScheme={'blue'}
            type={'submit'}
            onClick={() => next(position + 1)}
          >
            Начать
          </Button>
          <Button type={'button'} onClick={() => previous(position - 1)}>
            Назад
          </Button>
        </HStack>
      </VStack>
    </AnimateLayout>
  );
}
