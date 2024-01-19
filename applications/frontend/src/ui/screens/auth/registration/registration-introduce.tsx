import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { RegistrationProps } from './registration-props.type';
import styles from './registration-introduce.module.scss';

const RegistrationIntroduce = ({
  show,
  nextStep,
  backButtonAction,
}: Omit<
  RegistrationProps,
  'error' | 'register' | 'isTouched' | 'isSubmitting'
> & {
  backButtonAction?: () => void;
}) => {
  return (
    <Transition
      as={Fragment}
      appear={true}
      show={show}
      enter="transition ease-in-out duration-[450ms] transform-gpu"
      enterFrom={'translate-x-[300%] blur'}
      enterTo={'translate-x-0 filter-none'}
      leave="transition ease-in-out duration-[450ms] transform-gpu"
      leaveFrom={'translate-x-0 filter-none'}
      leaveTo={'-translate-x-[300%] blur'}
    >
      <div className={styles.introduce}>
        <h2>Давай познакомимся</h2>
        <div>
          <button type={'button'} onClick={nextStep}>
            Продолжить
          </button>
          {backButtonAction ? (
            <button type={'button'} onClick={() => backButtonAction()}>
              Назад
            </button>
          ) : null}
        </div>
      </div>
    </Transition>
  );
};
export default RegistrationIntroduce;
