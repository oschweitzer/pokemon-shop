import type { FormHTMLAttributes, ReactNode } from 'react';
import styles from './Form.module.css';

export default function Form(props: FormHTMLAttributes<HTMLFormElement>) {
  return <form className={styles.Form} {...props} />;
}

export function FormActions({ children }: { children: ReactNode }) {
  return <div className={styles.Actions}>{children}</div>;
}

export function FormError({ message }: { message: string | null }) {
  return message ? (
    <p className={styles.Error} role="alert">
      {message}
    </p>
  ) : null;
}

export function FormNotice({ children }: { children: ReactNode }) {
  return <p className={styles.Notice}>{children}</p>;
}
