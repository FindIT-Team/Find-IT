'use client';
import RadialGradientBackgroundComponent from '@/ui/components/radial-gradient-bg/radial-gradient-bg.component';
import LogoSvgComponent from '@/ui/components/svg/logo-svg.component';
import styles from './home.module.scss';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import HomeHeader from '@/ui/screens/home/home-header';
import HomeDescription from '@/ui/screens/home/home-description';
import HomeStartButton from '@/ui/screens/home/home-start-button';

const HomeScreen = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('');

  return (
    <>
      <RadialGradientBackgroundComponent />
      <header className={styles.screenHeader}>
        <LogoSvgComponent />
      </header>
      <main className={styles.screenMain}>
        <div>
          <div>
            <HomeHeader />
            <HomeDescription />
            <HomeStartButton
              handleClick={(url) => {
                setUrl(url);
                setShow(true);
              }}
            />
          </div>
        </div>
      </main>

      <Transition
        show={show}
        as={Fragment}
        enter="transition ease-in-out duration-[450ms] transform-gpu"
        enterFrom={'opacity-0 filter-none'}
        enterTo={'opacity-100 backdrop-blur'}
        afterEnter={() => router.push(url)}
      >
        <div className={styles.omission} />
      </Transition>
    </>
  );
};
export default HomeScreen;
