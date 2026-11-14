import type { ReactNode } from 'react';
import styles from './Section.module.css';

export default function Section({ children }: { children: ReactNode }) {
  return <div className={styles.Section}>{children}</div>;
}
