import ArrowIconComponent from '../svg/helpful-icons/arrow-icon.component';
import { ButtonProps } from './button-props.type';
import { FieldError } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';
import styles from './split-text-input.module.scss';

type SplitInputComponentProps = {
  startText?: string;
  name: string;
  register: (name: string, options?: any) => any;
  isTouched: boolean;
  error?: FieldError;
  type?: HTMLInputTypeAttribute;
  isLast?: boolean;
  isSubmitting?: boolean;
} & ButtonProps;

export default function SplitTextInputComponent({
  startText,
  handleClick,
  error,
  name,
  register,
  isTouched,
  type,
  isLast,
  isSubmitting,
}: SplitInputComponentProps) {
  return (
    <div className={styles.splitTextInput}>
      <div>
        <div>
          {startText ? (
            <span className={error ? 'border-red-600' : 'border-gray-300'}>
              {startText}
            </span>
          ) : null}
          <input
            {...register(name)}
            placeholder={''}
            name={name}
            type={type ? type : 'text'}
            className={`
              ${startText ? 'border-l-0' : 'rounded-l'} ${
                error ? 'border-red-600' : 'border-gray-300'
              }`}
            aria-invalid={!!error}
            required={true}
            formNoValidate={true}
          />
        </div>
        <button
          type={isLast ? 'submit' : 'button'}
          disabled={!isTouched || !!error || isSubmitting}
          className={error ? 'border-red-600' : ''}
          onClick={handleClick}
        >
          <ArrowIconComponent />
        </button>
      </div>
      <div>{error ? <span>{error.message}</span> : null}</div>
    </div>
  );
}
