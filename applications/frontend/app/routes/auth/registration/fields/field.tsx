import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { Context } from '~/routes/auth/registration/context';
import { useRemixFormContext } from 'remix-hook-form';
import { Schema } from '~/routes/auth/registration/schema';

export function Field({
  position,
  name,
  type,
}: {
  position: number;
  name: keyof Schema;
  type?: string;
}) {
  const { next, previous } = useContext(Context);
  const { register, formState } = useRemixFormContext<Schema>();
  const error: string = formState.errors[name]?.message as string;
  const isTouched: boolean | undefined = formState.touchedFields[name] as
    | boolean
    | undefined;

  return (
    <VStack width={'100%'}>
      <FormControl isInvalid={!!error}>
        <InputGroup>
          <Input type={type} {...register(name)} />
          <InputRightElement>
            <IconButton
              isDisabled={!!error || !isTouched}
              icon={<ArrowForwardIcon />}
              borderLeftRadius={0}
              colorScheme={'blue'}
              type={'button'}
              aria-label={'Продолжить'}
              onClick={() => next(position + 1)}
            />
          </InputRightElement>
        </InputGroup>
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
      <Button
        width={'100%'}
        type={'button'}
        onClick={() => previous(position - 1)}
      >
        Назад
      </Button>
    </VStack>
  );
}
