'use client';

import { DashboardProvider } from '@/lib/hooks-contexts/dashboard.context';
import { UserProvider } from '@/lib/hooks-contexts/user.context';
import SidebarComponent from '@/ui/components/sidebar/sidebar.component';
import DashboardScreen from '@/ui/screens/dashboard/dashboard.screen';

const DashboardPage = () => {
  return (
    <UserProvider>
      <DashboardProvider>
        <DashboardScreen />
        <SidebarComponent />
      </DashboardProvider>
    </UserProvider>
  );
};
export default DashboardPage;
