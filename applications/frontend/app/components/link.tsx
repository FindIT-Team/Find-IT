import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import {
  Link as RemixLink,
  LinkProps as RemixLinkProps,
} from '@remix-run/react';

export function Link(props: ChakraLinkProps & RemixLinkProps) {
  return <ChakraLink as={RemixLink} prefetch={'intent'} {...props} />;
}
