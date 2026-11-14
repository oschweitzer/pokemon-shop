import { useState, type SubmitEvent } from 'react';
import { Navigate, useLocation } from 'react-router';
import { ACCOUNT, SIGN_IN } from '../../constants/routes';
import { authErrorMessage, changePassword } from '../../lib/auth';
import { validatePassword } from '../../lib/validation';
import { useAppSelector } from '../../store/hooks';
import Button from '../Button/Button';
import { FormError, FormNotice } from '../Form/Form';
import FormItem from '../Form/FormItem/FormItem';
import Section from '../Section/Section';
import styles from './UserAccount.module.css';

export default function UserAccount() {
  const { email, ready } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [editing, setEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [updated, setUpdated] = useState(false);
  const isPasswordValid = validatePassword(newPassword);

  if (!ready) {
    return null;
  }
  if (!email) {
    return <Navigate to={SIGN_IN} state={{ from: ACCOUNT }} replace key={location.key} />;
  }

  const stopEditing = () => {
    setEditing(false);
    setNewPassword('');
    setError(null);
  };

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isPasswordValid) {
      return;
    }
    try {
      await changePassword(newPassword);
      stopEditing();
      setUpdated(true);
    } catch (err) {
      setError(authErrorMessage(err));
    }
  };

  return (
    <Section>
      <h2>Account parameters</h2>
      <div className={styles.UserAccount}>
        <span>
          <b>Email</b>: {email}
        </span>
        {updated && <FormNotice>Password successfully updated.</FormNotice>}
        {editing ? (
          <form className={styles.UpdatePasswordForm} onSubmit={(event) => void onSubmit(event)}>
            <FormItem
              id="new-password"
              label="New password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={setNewPassword}
              isValid={isPasswordValid}
            />
            <FormError message={error} />
            <div className={styles.Actions}>
              <Button variant="danger" onClick={stopEditing}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isPasswordValid}>
                Update
              </Button>
            </div>
          </form>
        ) : (
          <span>
            <b>Password</b>:&nbsp;
            <Button
              onClick={() => {
                setUpdated(false);
                setEditing(true);
              }}
            >
              Update password
            </Button>
          </span>
        )}
      </div>
    </Section>
  );
}
