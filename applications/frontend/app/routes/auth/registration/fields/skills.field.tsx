import { useContext } from 'react';
import { Context } from '~/routes/auth/registration/context';
import { AnimateLayout } from '~/routes/auth/registration/animate-layout';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from '@chakra-ui/react';
import { useRemixFormContext } from 'remix-hook-form';

export function SkillsField() {
  const { screenSearch, next, previous } = useContext(Context);
  const position = screenSearch('skills');

  const fields = {
    ProjectManagement: 'Проектный менеджмент',
    Backend: 'Бэкенд',
    Frontend: 'Фронтенд',
    MachineLearning: 'Машинное обучение',
    DevOps: 'DevOps',
    QA: 'QA',
  };

  const { register } = useRemixFormContext();
  const errors = useRemixFormContext().formState.errors
    .skills as unknown as Record<string, Record<string, string>>;
  return (
    <AnimateLayout position={position}>
      <Heading>Что насчет твоих навыков?</Heading>
      <VStack width={'100%'}>
        {Object.keys(fields).map((field) => (
          <FormControl
            key={field}
            isInvalid={errors && !!errors[field]?.message}
          >
            <FormLabel htmlFor={field} mb={0}>
              {fields[field as keyof typeof fields]}
            </FormLabel>
            <NumberInput min={0} max={10} defaultValue={0}>
              <NumberInputField {...register(`skills.${field}`)} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {!!errors && errors[field]?.message ? (
              <FormErrorMessage>{errors[field]?.message}</FormErrorMessage>
            ) : (
              <FormHelperText
                fontFamily={['IBM Plex Mono, monospace']}
                color={'transparent'}
              >
                Null
              </FormHelperText>
            )}
          </FormControl>
        ))}
        <HStack
          width={'100%'}
          flexDirection={['column', 'column', 'row-reverse', 'row-reverse']}
          justifyContent={'space-between'}
          alignItems={'stretch'}
        >
          <Button
            isDisabled={errors && Object.keys(errors).length > 0}
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
      </VStack>
    </AnimateLayout>
  );
}
