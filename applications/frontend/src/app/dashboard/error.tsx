'use client';

import { usePathname, useRouter } from 'next/navigation';

const DashboardError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const router = useRouter();
  const path = usePathname();

  if (
    error.message === 'Forbidden' &&
    (path.includes('dashboard') || path.includes('settings'))
  )
    router.replace('/auth/login');

  return (
    <main className={'bg-black justify-center items-center text-white'}>
      <h1>{error.message}</h1>
      <button onClick={reset}>Try again</button>
    </main>
  );
};
export default DashboardError;
