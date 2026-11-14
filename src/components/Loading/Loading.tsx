import styles from './Loading.module.css';

export default function Loading() {
  return <div className={styles.Loader} role="status" aria-label="Loading" />;
}
