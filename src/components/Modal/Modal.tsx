import type { ReactNode } from 'react';
import styles from './Modal.module.css';

export default function Modal({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.Modal} role="dialog" aria-modal="true" aria-label={label}>
      {children}
    </div>
  );
}
