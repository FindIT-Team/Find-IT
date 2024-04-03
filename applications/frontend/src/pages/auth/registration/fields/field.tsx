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
import { RiArrowRightLine } from 'react-icons/ri';
import { useRemixFormContext } from 'remix-hook-form';
import { Context } from '../context';
import { Schema } from '../schema';

export function Field({
  position,
  name,
  type,
}: {
  position: number;
  name: string;
  type?: string;
}) {
  const { next, previous } = useContext(Context);
  const { register, formState } = useRemixFormContext<Schema>();
  const [g, n] = name.split('.') as [keyof Schema, keyof Schema[keyof Schema]];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const error: string = formState.errors[g]?.[n]?.message;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isTouched: boolean | undefined = formState.dirtyFields[g]?.[n];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isValidating = formState.validatingFields[g]?.[n];

  return (
    <VStack width={'full'}>
      <FormControl isInvalid={!!error}>
        <InputGroup>
          <Input
            type={type}
            {...register(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              name as any,
            )}
          />
          <InputRightElement>
            <IconButton
              isDisabled={!!error || !isTouched || isValidating}
              icon={<RiArrowRightLine />}
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
        ) : isValidating === true ? (
          <FormHelperText textAlign={'left'}>Проверка...</FormHelperText>
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
        width={'full'}
        type={'button'}
        onClick={() => previous(position - 1)}
      >
        Назад
      </Button>
    </VStack>
  );
}
