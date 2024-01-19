import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '@/ui/screens/auth/login/login.schema';
import { ibmPlexMono } from '@/lib/fonts';
import styles from './login-form.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginForm = ({ push }: { push: (...args: any[]) => void }) => {
  const { handleSubmit, register } = useForm<LoginSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<LoginSchema> = async (
    data: LoginSchema,
  ): Promise<void> => {
    console.log('Work');
    const response = await fetch(`/api/auth/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.status === 200) push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={ibmPlexMono.className}>
        <div>
          <label htmlFor={'uniq'}>Логин/электронная почта</label>
          <input {...register('uniq')} type={'text'} />
        </div>
        <div>
          <label htmlFor={'password'}>Пароль</label>
          <input {...register('password')} type={'password'} />
        </div>
      </div>
      <div>
        <button type={'submit'}>Войти</button>
        <button type={'button'} onClick={() => push('/auth/registration')}>
          Регистрация
        </button>
      </div>
    </form>
  );
};
export default LoginForm;
