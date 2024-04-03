import { Box, Button, Spinner, StackDivider, VStack } from '@chakra-ui/react';
import { NavLink } from '@remix-run/react';

export function NavLinks() {
  const navLinks = [
    {
      to: 'profile',
      label: 'Профиль',
    },
    {
      to: 'account',
      label: 'Аккаунт',
    },
  ];

  return (
    <VStack spacing={1} flexGrow={0.2} padding={4} divider={<StackDivider />}>
      {navLinks.map(({ to, label }) => (
        <NavLink
          to={to}
          key={to}
          style={({ isPending, isActive }) => {
            return {
              pointerEvents: isPending || isActive ? 'none' : 'auto',
              width: '100%',
            };
          }}
        >
          {({ isActive, isPending }) => (
            <Button
              as={Box}
              size={'sm'}
              background={isActive ? 'gray.300' : 'transparent'}
              _hover={{ background: 'gray.300' }}
              width={'full'}
            >
              {isPending ? <Spinner size={'sm'} /> : label}
            </Button>
          )}
        </NavLink>
      ))}
    </VStack>
  );
}
