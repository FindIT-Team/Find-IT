import { createContext } from 'react';

export const UserContext = createContext<UserDto>({} as UserDto);

export const UserProvider = UserContext.Provider;
