import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
}

export default function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const classes = [styles.Button, variant === 'danger' ? styles.Danger : styles.Primary, className]
    .filter(Boolean)
    .join(' ');
  return <button type="button" className={classes} {...props} />;
}
