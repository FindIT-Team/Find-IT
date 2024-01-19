import { RegistrationProps } from './registration-props.type';
import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import NumberInputComponent from '@/ui/components/input-components/number-input.component';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import styles from './registration-input.module.scss';

const RegistrationSkills = ({
  show,
  nextStep,
  register,
  errors,
  isSubmitting,
}: Omit<RegistrationProps, 'error' | 'isTouched'> & {
  errors?: Merge<
    FieldError,
    FieldErrorsImpl<{
      ProjectManagement: number;
      Backend: number;
      Frontend: number;
      MachineLearning: number;
      DevOps: number;
      QA: number;
    }>
  >;
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
      <div className={styles.numberInput}>
        <h2>Что насчет твоих навыков?</h2>
        <div>
          <NumberInputComponent
            defaultValue={0}
            label={'ProjectType Management:'}
            min={0}
            max={10}
            name={'skills.ProjectManagement'}
            register={register}
            error={
              errors
                ? 'ProjectManagement' in errors
                  ? errors.ProjectManagement
                  : null
                : null
            }
          />
          <NumberInputComponent
            defaultValue={0}
            label={'Frontend:'}
            min={0}
            max={10}
            name={'skills.Frontend'}
            register={register}
            error={
              errors ? ('Frontend' in errors ? errors.Frontend : null) : null
            }
          />
          <NumberInputComponent
            defaultValue={0}
            label={'Backend:'}
            min={0}
            max={10}
            name={'skills.Backend'}
            register={register}
            error={
              errors ? ('Backend' in errors ? errors.Backend : null) : null
            }
          />
          <NumberInputComponent
            defaultValue={0}
            label={'Machine Learning:'}
            min={0}
            max={10}
            name={'skills.MachineLearning'}
            register={register}
            error={
              errors
                ? 'MachineLearning' in errors
                  ? errors.MachineLearning
                  : null
                : null
            }
          />
          <NumberInputComponent
            defaultValue={0}
            label={'DevOps:'}
            min={0}
            max={10}
            name={'skills.DevOps'}
            register={register}
            error={errors ? ('DevOps' in errors ? errors.DevOps : null) : null}
          />
          <NumberInputComponent
            defaultValue={0}
            label={'QA:'}
            min={0}
            max={10}
            name={'skills.QA'}
            register={register}
            error={errors ? ('QA' in errors ? errors.QA : null) : null}
          />
        </div>
        <button
          type={'button'}
          disabled={!!errors || isSubmitting}
          onClick={nextStep}
        >
          Продолжить
        </button>
      </div>
    </Transition>
  );
};
export default RegistrationSkills;
