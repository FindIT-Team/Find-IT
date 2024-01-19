import styles from './dashboard-content.module.scss';
import { ibmPlexMono } from '@/lib/fonts';

const DashboardError = () => {
  return (
    <div className={styles.error + ' ' + ibmPlexMono.className}>
      Ошибка преследовала тебя, кажется, ты не успел убежать
    </div>
  );
};
export default DashboardError;
