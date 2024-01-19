import { ButtonProps } from '@/ui/components/input-components/button-props.type';
import styles from './home-content.module.scss';

const HomeStartButton = ({ handleClick }: ButtonProps) => {
  return (
    <div className={styles.startButton}>
      <button onClick={() => handleClick('/auth/login')}>Начать</button>
      <button onClick={() => handleClick('/help/faq')}>
        Нужна помощь? <span>Посмотрите FAQ</span>
      </button>
    </div>
  );
};
export default HomeStartButton;
