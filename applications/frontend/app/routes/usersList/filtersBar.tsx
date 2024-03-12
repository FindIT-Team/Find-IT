import { Button, Heading, VStack } from '@chakra-ui/react';
import { FilterField } from '~/routes/usersList/filterField';

export function FiltersBar() {
  return (
    <VStack
      border={'1px solid'}
      borderColor={'gray.300'}
      borderRadius={'lg'}
      padding={4}
      alignItems={'flex-start'}
      width={'20%'}
    >
      <Heading fontSize={'md'}>Поиск</Heading>

      <FilterField />
      <FilterField />
      <FilterField />
      <FilterField />
      <FilterField />
      <FilterField />
      <Button width={100} bg={'gray.300'}>
        Применить
      </Button>
    </VStack>
  );
}
