import React, { createContext, useState } from 'react';
import { Variants } from 'framer-motion';

export const Context = createContext({
  rightDirection: true as boolean,
  screenVariants: {} as Variants,
  step: 0 as number,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  screenSearch: (screen: string): number => 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: (step: number): void => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  previous: (step: number): void => {},
});

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const screenVariants = {
    leftHidden: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.5 },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, delay: 0.2 },
    },
    rightHidden: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const screens = [
    'intro',
    'username',
    'name',
    'email',
    'gender',
    'skills',
    'password',
    'outro',
  ];

  const [step, setStep] = useState(0);
  const [rightDirection, setRight] = useState(true);

  const next = (step: number) => {
    if (!rightDirection) {
      setRight(true);
      setTimeout(() => setStep(step), 10);
    } else setStep(step);
  };

  const previous = (step: number) => {
    if (rightDirection) {
      setRight(false);
      setTimeout(() => setStep(step), 10);
    } else setStep(step);
  };

  const screenSearch = (screen: string) => screens.indexOf(screen);

  const value = {
    rightDirection,
    screenVariants,
    step,
    screenSearch,
    next,
    previous,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
