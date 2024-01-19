import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import LoginForm from '@/ui/screens/auth/login/login-form';
import { loginUrls } from '@/ui/screens/auth/login/login-urls';
import LoginWith from '@/ui/screens/auth/login/login-with';
import styles from './login.module.scss';

const LoginScreen = () => {
  const [show, setShow] = useState(true);

  const router = useRouter();
  const [url, setUrl] = useState('');
  const push = (href: string) => {
    setUrl(href);
    setShow(false);
  };

  return (
    <Transition
      as={Fragment}
      show={show}
      appear={true}
      enter="transition ease-in-out duration-[450ms]"
      enterFrom={'opacity-0 backdrop-blur'}
      enterTo={'opacity-100 filter-none'}
      leave="transition ease-in-out duration-[450ms]"
      leaveFrom={'opacity-100 filter-none'}
      leaveTo={'opacity-0 backdrop-blur'}
      afterLeave={() => router.push(url)}
    >
      <main className={styles.screen}>
        <div>
          {loginUrls.map((u) => (
            <Link key={u.id} href={u.href} />
          ))}
        </div>
        <div>
          <div>
            <LoginWith push={push} />
            <div>
              <hr />
              <span>или</span>
            </div>
            <LoginForm push={push} />
          </div>
          <div />
        </div>
      </main>
    </Transition>
  );
};
export default LoginScreen;
