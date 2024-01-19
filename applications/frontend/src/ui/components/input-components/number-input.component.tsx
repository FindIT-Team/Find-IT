import { FieldError } from 'react-hook-form';
import styles from './number-input.module.scss';

type InputNumberComponentProps = {
  defaultValue?: number;
  label?: string;
  min?: number;
  max?: number;
  name: string;
  error?: FieldError;
  register: (name: string, options?: any) => any;
};

export default function NumberInputComponent({
  defaultValue,
  label,
  min,
  max,
  name,
  register,
  error,
}: InputNumberComponentProps) {
  return (
    <div className={styles.numberInput}>
      {label ? <label>{label}</label> : null}
      <input
        {...register(name, {
          setValueAs: (value: string) => Number(value),
        })}
        name={name}
        defaultValue={defaultValue}
        type={'number'}
        min={min}
        max={max}
        aria-invalid={!!error}
      />
    </div>
  );
}
