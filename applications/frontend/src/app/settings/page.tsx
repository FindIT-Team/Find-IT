'use client';

import SidebarComponent from '@/ui/components/sidebar/sidebar.component';
import { UserProvider } from '@/lib/hooks-contexts/user.context';

const SettingsPage = () => {
  return (
    <UserProvider>
      <SidebarComponent />
    </UserProvider>
  );
};
export default SettingsPage;
