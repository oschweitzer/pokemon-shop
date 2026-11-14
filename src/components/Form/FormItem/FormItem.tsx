import FormItemValidation from '../FormItemValidation/FormItemValidation';
import styles from './FormItem.module.css';

interface FormItemProps {
  id: string;
  label: string;
  type: 'email' | 'password' | 'text';
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  /** When set, tells the user whether the value is valid once they started typing. */
  isValid?: boolean;
}

export default function FormItem({
  id,
  label,
  type,
  value,
  onChange,
  autoComplete,
  isValid,
}: FormItemProps) {
  const showValidation = isValid !== undefined && value !== '';
  return (
    <div className={styles.FormItem}>
      <div className={styles.Row}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          aria-describedby={showValidation ? `${id}-validation` : undefined}
          aria-invalid={showValidation ? !isValid : undefined}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      </div>
      {showValidation ? (
        <FormItemValidation id={`${id}-validation`} isValid={isValid} label={type} />
      ) : (
        <span className={styles.Hidden} aria-hidden="true">
          Validation
        </span>
      )}
    </div>
  );
}
