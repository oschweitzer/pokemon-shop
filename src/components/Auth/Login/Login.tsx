import { useState, type SubmitEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { authErrorMessage, isAuthConfigured, signIn } from '../../../lib/auth';
import { HOME, RESET_PASSWORD, SIGN_UP } from '../../../constants/routes';
import { useCloseModal } from '../../../hooks/useCloseModal';
import Button from '../../Button/Button';
import Form, { FormActions, FormError, FormNotice } from '../../Form/Form';
import FormItem from '../../Form/FormItem/FormItem';
import Modal from '../../Modal/Modal';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const close = useCloseModal();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { from?: string } | null;
  const from = locationState?.from ?? HOME;

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      await signIn(email, password);
      void navigate(from, { replace: true });
    } catch (err) {
      setError(authErrorMessage(err));
      setPending(false);
    }
  };

  return (
    <Modal label="Login">
      <Form onSubmit={(event) => void onSubmit(event)}>
        <h3>Login</h3>
        {!isAuthConfigured && <FormNotice>Accounts are disabled in this demo.</FormNotice>}
        <FormItem
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={setEmail}
        />
        <FormItem
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
        />
        <FormError message={error} />
        <span className={styles.SignUpText}>
          You do not have an account? &nbsp;
          <Link to={SIGN_UP} state={locationState}>
            Sign up
          </Link>
        </span>
        <span className={styles.SignUpText}>
          <Link to={RESET_PASSWORD}>Forgot password?</Link>
        </span>
        <FormActions>
          <Button variant="danger" onClick={close}>
            Close
          </Button>
          <Button type="submit" disabled={!email || !password || pending || !isAuthConfigured}>
            Login
          </Button>
        </FormActions>
      </Form>
    </Modal>
  );
}
