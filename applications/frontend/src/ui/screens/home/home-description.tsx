import { ibmPlexMono } from '@/lib/fonts';
import styles from './home-content.module.scss';

const HomeDescription = () => {
  return (
    <p className={`${ibmPlexMono.className} ${styles.description}`}>
      Теперь вы точно сможете найти своих единомышленников для своих IT идей
    </p>
  );
};
export default HomeDescription;
