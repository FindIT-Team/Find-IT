import { FieldError } from 'react-hook-form';

export type RegistrationProps = {
  show: boolean;
  nextStep: (...args: any[]) => void;
  register?: (...args: any[]) => any;
  error?: FieldError;
  isTouched: boolean;
  isSubmitting?: boolean;
};
