import { createContext } from 'react';
import { UserDto } from '.';

export const UserContext = createContext<UserDto>({} as UserDto);

export const UserProvider = UserContext.Provider;
