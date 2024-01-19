import RegistrationIntroduce from './registration-introduce';
import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import RegistrationUsername from './registration-username';
import RegistrationName from './registration-name';
import RegistrationSkills from './registration-skills';
import RegistrationGender from './registration-gender';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationSchema, registrationSchema } from './registration.schema';
import RegistrationPassword from './registration-password';
import RegistrationWarning from './registration-warning';
import RegistrationEmail from './registration-email';
import styles from './registration.module.scss';

const RegistrationScreen = () => {
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get('data'));

  if (data) {
    if (data.name) data.name = Object.values(data.name).join(' ');
    if (data.gender)
      data.gender = data.gender[0].toUpperCase() + data.gender.slice(1);
  }

  const defaultValues: RegistrationSchema = data;

  const [show, setShow] = useState(true);
  const router = useRouter();

  const [step, setStep] = useState(0);

  const {
    setValue,
    getValues,
    register,
    formState: { touchedFields, isSubmitting, errors },
    handleSubmit,
  } = useForm<RegistrationSchema>({
    defaultValues: { ...defaultValues },
    mode: 'onTouched',
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationSchema> = async (
    data: RegistrationSchema,
  ): Promise<void> => {
    const [firstName, lastName] = data.name.split(' ');
    const parsedData = {
      ...data,
      name: { firstName: firstName, lastName: lastName },
    };

    const response = await fetch(`/api/auth/registration`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(parsedData),
    });
    if (response.status === 201) router.replace('/dashboard');
  };

  const defaultRegistrationValues = getValues();

  return (
    <Transition
      as={Fragment}
      show={show}
      appear={true}
      enter="transition ease-in-out duration-[450ms] transform-gpu"
      enterFrom={'opacity-0 backdrop-blur'}
      enterTo={'opacity-100 filter-none'}
      leave="transition ease-in-out duration-[450ms] transform-gpu"
      leaveFrom={'opacity-100 filter-none'}
      leaveTo={'opacity-0 backdrop-blur'}
      afterLeave={() => router.replace('/auth/login')}
    >
      <main className={styles.screen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RegistrationIntroduce
            show={step === 0}
            nextStep={() => setStep(1)}
            backButtonAction={() => setShow(false)}
          />
          <RegistrationUsername
            isSubmitting={isSubmitting}
            register={register}
            isTouched={
              touchedFields.username || !!defaultRegistrationValues.username
            }
            error={errors.username}
            show={step === 1}
            nextStep={() => setStep(2)}
          />
          <RegistrationName
            isSubmitting={isSubmitting}
            register={register}
            isTouched={touchedFields.name || !!defaultRegistrationValues.name}
            error={errors.name}
            show={step === 2}
            nextStep={() => setStep(3)}
          />
          <RegistrationEmail
            isSubmitting={isSubmitting}
            register={register}
            isTouched={touchedFields.email || !!defaultRegistrationValues.email}
            error={errors.email}
            show={step === 3}
            nextStep={() => setStep(4)}
          />
          <RegistrationSkills
            isSubmitting={isSubmitting}
            register={register}
            errors={errors.skills}
            show={step === 4}
            nextStep={() => setStep(5)}
          />
          <RegistrationGender
            defaultValue={defaultRegistrationValues.gender}
            setValue={setValue}
            isSubmitting={isSubmitting}
            show={step === 5}
            nextStep={() => setStep(6)}
          />
          <RegistrationPassword
            register={register}
            isSubmitting={isSubmitting}
            isTouched={touchedFields.password}
            error={errors.password}
            show={step === 6}
            nextStep={() => setStep(-1)}
          />
        </form>
        <RegistrationWarning
          text={'Позже ты сможешь отредактировать свой профиль'}
          step={step}
          where={0}
        />
        <RegistrationWarning
          text={'Имя пользователя не будет привязано к регистру'}
          step={step}
          where={1}
        />
        <RegistrationWarning
          text={
            'Используй настоящую почту, на неё придет письмо с подтверждением'
          }
          step={step}
          where={3}
        />
        <RegistrationWarning
          text={
            'Придумай сложный пароль, во избежании попытки украсть твой аккаунт'
          }
          step={step}
          where={6}
        />
      </main>
    </Transition>
  );
};
export default RegistrationScreen;
