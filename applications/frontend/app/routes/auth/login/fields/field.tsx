import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useRemixFormContext } from 'remix-hook-form';
import { Schema } from '~/routes/auth/login/shema';

export function Field({
  name,
  type,
  label,
}: {
  name: keyof Schema;
  type?: string;
  label?: string;
}) {
  const { register, formState } = useRemixFormContext<Schema>();

  const error: string = formState.errors[name]?.message as string;

  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input type={type} {...register(name)} />
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
  );
}
