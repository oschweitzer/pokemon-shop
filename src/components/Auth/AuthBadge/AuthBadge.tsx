import styles from './AuthBadge.module.css';

interface AuthBadgeProps {
  user: string | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export default function AuthBadge({ user, onSignIn, onSignOut }: AuthBadgeProps) {
  if (!user) {
    return (
      <button
        type="button"
        className={[styles.AuthButton, styles.AuthSpan].join(' ')}
        onClick={onSignIn}
      >
        Sign in / Sign up
      </button>
    );
  }
  return (
    <div className={styles.LoggedIn}>
      <span className={styles.AuthSpan}>
        <b>Logged in</b>
      </span>
      <span className={styles.AuthSpan}>{user}</span>
      <button
        type="button"
        className={[styles.AuthButton, styles.AuthSpan].join(' ')}
        onClick={onSignOut}
      >
        Logout
      </button>
    </div>
  );
}
