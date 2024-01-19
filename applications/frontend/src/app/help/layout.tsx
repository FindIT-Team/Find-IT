import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Авторизация | FindIT',
};

const HelpLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default HelpLayout;
