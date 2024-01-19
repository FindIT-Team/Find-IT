import { ibmPlexMono } from '@/lib/fonts';
import styles from './home-content.module.scss';

const HomeHeader = () => {
  return (
    <header className={styles.header}>
      <h1 className={ibmPlexMono.className}>
        <span>Find IT</span> — первое кроссплатформенное приложение для{' '}
        <span>предпринимателей</span>
      </h1>
    </header>
  );
};
export default HomeHeader;
