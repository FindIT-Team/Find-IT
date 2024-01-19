import styles from './copyright.module.scss';
import { ibmPlexMono } from '@/lib/fonts';

export default function CopyrightComponent() {
  return (
    <footer className={styles.copyright}>
      <h6 className={ibmPlexMono.className}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}© Powered
        by Find IT's team
      </h6>
    </footer>
  );
}
