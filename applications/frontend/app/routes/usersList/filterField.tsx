import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

export function FilterField() {
  return (
    <VStack>
      <FormControl>
        <FormLabel></FormLabel>
        <Input placeholder={'От 0 до 10'} />
      </FormControl>
    </VStack>
  );
}
