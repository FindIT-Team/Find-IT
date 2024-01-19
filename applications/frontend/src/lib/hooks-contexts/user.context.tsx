import useGetData from '@/lib/hooks-contexts/use-get-data.hook';
import { UserType } from '@/lib/types/user.type';
import React, { createContext, useContext } from 'react';

const UserContext = createContext<UserType>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const data = useGetData('/api/dashboard/user');

  const user: UserType = data && data;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
