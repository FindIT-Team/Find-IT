import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Панель управления | FindIT',
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default DashboardLayout;
