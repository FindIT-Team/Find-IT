import { CogIcon, HomeIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import styles from './sidebar.module.scss';
import SidebarLink from '@/ui/components/sidebar/sidebar-link';
import { useUser } from '@/lib/hooks-contexts/user.context';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const SidebarComponent = () => {
  const path = usePathname();
  const router = useRouter();
  const user = useUser();

  return (
    user && (
      <nav className={styles.sidebar}>
        <div>
          <SidebarLink
            useNow={path.includes('dashboard')}
            handleClick={() => router.push('/dashboard')}
          >
            <HomeIcon />
          </SidebarLink>
          <SidebarLink
            useNow={path.includes('settings')}
            handleClick={() => router.push('settings')}
          >
            <CogIcon />
          </SidebarLink>
        </div>
        <div>
          <Menu>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`block px-4 py-2 w-full ${
                          active ? 'bg-gray-100' : ''
                        }`}
                      >
                        Профиль
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
    )
  );
};
export default SidebarComponent;
