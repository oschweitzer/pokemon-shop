import styles from './FormItemValidation.module.css';

interface FormItemValidationProps {
  id: string;
  isValid: boolean;
  label: string;
}

export default function FormItemValidation({ id, isValid, label }: FormItemValidationProps) {
  return (
    <span id={id} className={isValid ? styles.ValidInput : styles.InvalidInput}>
      {isValid ? 'Valid' : 'Invalid'} {label}
    </span>
  );
}
