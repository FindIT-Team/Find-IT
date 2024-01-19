import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Часто задаваемые вопросы | FindIT',
};

const FAQLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default FAQLayout;
