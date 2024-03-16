import { NavLink } from '@remix-run/react';
import { Box, Button, VStack } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import {
  RiHome3Fill,
  RiHome3Line,
  RiSettings3Fill,
  RiSettings3Line,
  RiTeamFill,
  RiTeamLine,
  RiUserFill,
  RiUserLine,
} from 'react-icons/ri';

export function NavLinks() {
  const navLinks = [
    {
      to: '/dashboard',
      icon: RiHome3Line,
      activeIcon: RiHome3Fill,
    },
    {
      to: '/settings',
      icon: RiSettings3Line,
      activeIcon: RiSettings3Fill,
    },
    {
      to: '/users',
      icon: RiTeamLine,
      activeIcon: RiTeamFill,
    },
    {
      to: '/profile',
      icon: RiUserLine,
      activeIcon: RiUserFill,
    },
  ];

  return (
    <VStack>
      {navLinks.map(({ to, icon, activeIcon }) => (
        <NavLink to={to} key={to}>
          {({ isActive, isPending }) => (
            <Button as={Box} boxSize={10} padding={2.5} variant={'outline'}>
              {isPending ? (
                <></>
              ) : (
                <Icon as={isActive ? activeIcon : icon} boxSize={'full'} />
              )}
            </Button>
          )}
        </NavLink>
      ))}
    </VStack>
  );
}
