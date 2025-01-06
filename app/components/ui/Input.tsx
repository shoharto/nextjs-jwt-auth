import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { styles } from '@/lib/styles';

type InputProps<TFormValues extends FieldValues> = {
  label: string;
  error?: string;
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  type?: string;
  placeholder?: string;
};

export function Input<TFormValues extends FieldValues>({ 
  label, 
  error, 
  register, 
  name, 
  type = 'text',
  placeholder
}: InputProps<TFormValues>) {
  return (
    <div>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={styles.input}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
} 