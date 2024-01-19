import { RegistrationProps } from './registration-props.type';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import styles from './registration-input.module.scss';

const RegistrationGender = ({
  show,
  nextStep,
  setValue,
  isSubmitting,
  defaultValue,
}: Omit<RegistrationProps, 'error' | 'isTouched' | 'register'> & {
  setValue: (...args: any[]) => void;
  defaultValue?: string;
}) => {
  const genders = [
    { id: 'Male', value: 'Парень' },
    { id: 'Female', value: 'Девушка' },
  ];
  const [selectedGender, setSelectedGender] = useState(
    defaultValue
      ? genders.find((gender) => gender.id === defaultValue)
      : {
          id: '',
          value: '',
        },
  );

  setValue('gender', selectedGender.id);

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
      <div className={styles.selectInput}>
        <h2>Ты парень или девушка?</h2>
        <Listbox value={selectedGender} by={'id'} onChange={setSelectedGender}>
          <Listbox.Button>
            <span>{selectedGender.value}</span>
            <ChevronUpDownIcon />
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-in-out duration-[250ms]"
            enterFrom={'opacity-0'}
            enterTo={'opacity-100'}
            leave="transition ease-in-out duration-[250ms]"
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}
          >
            <Listbox.Options>
              {genders.map((gender) => (
                <Listbox.Option
                  key={gender.id}
                  value={gender}
                  className={({ selected, active }) =>
                    selected
                      ? 'bg-white cursor-default'
                      : active
                        ? 'bg-amber-50 cursor-pointer'
                        : 'bg-white'
                  }
                >
                  {({ selected }) => (
                    <>
                      <button>{gender.value}</button>
                      {selected ? (
                        <div className={'w-5'}>
                          <CheckIcon className={'w-full'} />
                        </div>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
        <button
          disabled={selectedGender.id === '' || isSubmitting}
          type={'button'}
          onClick={nextStep}
        >
          Продолжить
        </button>
      </div>
    </Transition>
  );
};
export default RegistrationGender;
