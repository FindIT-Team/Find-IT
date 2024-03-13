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
import { schema, Schema } from '~/routes/auth/registration/schema';
import { RiArrowRightLine } from 'react-icons/ri';
import { schemaViewer } from '~/utils/schema-viewer';

type fieldsNames =
  | 'user.username'
  | 'user.email'
  | 'user.password'
  | 'profile.name';

type DownerUserFields = keyof typeof schema.shape.user.shape;

export function Field({
  position,
  name,
  type,
}: {
  position: number;
  name: fieldsNames;
  type?: string;
}) {
  const { next, previous } = useContext(Context);
  const { register, formState } = useRemixFormContext<Schema>();
  const [g, n] = name.split('.') as ['user', DownerUserFields];
  const error: string = formState.errors[g]?.[n]?.message as string;
  const isTouched: boolean | undefined = formState.touchedFields[g]?.[n] as
    | boolean
    | undefined;

  console.log(schemaViewer(schema));

  return (
    <VStack width={'full'}>
      <FormControl isInvalid={!!error}>
        <InputGroup>
          <Input type={type} {...register(name)} />
          <InputRightElement>
            <IconButton
              isDisabled={!!error || !isTouched}
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
