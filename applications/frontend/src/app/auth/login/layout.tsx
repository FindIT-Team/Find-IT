import React from 'react';
import { Metadata } from 'next';
import '../../../ui/screens/auth/login/login.module.scss';

export const metadata: Metadata = {
  title: 'Авторизация | FindIT',
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default AuthLayout;
