import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  IconButton,
  Input,
  useEditableControls,
} from '@chakra-ui/react';
import { RiCheckLine, RiCloseLine, RiEditLine } from 'react-icons/ri';

export function ChangeUsername() {
  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="md">
        <IconButton
          icon={<RiCheckLine />}
          {...getSubmitButtonProps()}
          _hover={{ bg: 'gray.200' }}
        />
        <IconButton
          icon={<RiCloseLine />}
          {...getCancelButtonProps()}
          _hover={{ bg: 'gray.200' }}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          size="md"
          icon={<RiEditLine />}
          {...getEditButtonProps()}
          _hover={{ bg: 'gray.200' }}
        />
      </Flex>
    );
  }

  return (
    <HStack alignItems={'flex-start'}>
      <Editable
        textAlign="center"
        defaultValue="Chupapi Munanya"
        fontSize="md"
        isPreviewFocusable={false}
      >
        <EditablePreview
          bg={'gray.100'}
          padding={2}
          border={'1px solid'}
          borderColor={'gray.300'}
          borderRadius={'lg'}
        />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
    </HStack>
  );
}
