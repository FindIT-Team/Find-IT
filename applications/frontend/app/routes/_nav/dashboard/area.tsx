import { GridItem, GridItemProps } from '@chakra-ui/react';

export function Area({
  children,
  name,
  chakraProps,
}: {
  children: React.ReactNode;
  name: string;
  chakraProps?: GridItemProps;
}) {
  return (
    <GridItem
      area={name}
      border={'1px solid'}
      borderColor={'gray.200'}
      borderRadius={'md'}
      shadow={'md'}
      padding={3.5}
      {...chakraProps}
    >
      {children}
    </GridItem>
  );
}
