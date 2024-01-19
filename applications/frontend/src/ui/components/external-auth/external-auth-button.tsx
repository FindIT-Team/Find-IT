import styles from './external-auth.module.scss';
import Image from 'next/image';

type LoginWithButtonProps = { src: string; alt: string; action: () => void };

export default function ExternalAuthButton({
  src,
  alt,
  action,
}: LoginWithButtonProps) {
  return (
    <button onClick={action} className={styles.loginWithButton}>
      <Image width={1000000} height={1000000} src={src} alt={alt} />
    </button>
  );
}
