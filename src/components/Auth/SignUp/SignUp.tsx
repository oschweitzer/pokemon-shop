import { useState, type SubmitEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { authErrorMessage, isAuthConfigured, signUp } from '../../../lib/auth';
import { validateEmail, validatePassword } from '../../../lib/validation';
import { HOME } from '../../../constants/routes';
import { useCloseModal } from '../../../hooks/useCloseModal';
import Button from '../../Button/Button';
import Form, { FormActions, FormError, FormNotice } from '../../Form/Form';
import FormItem from '../../Form/FormItem/FormItem';
import Modal from '../../Modal/Modal';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const close = useCloseModal();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? HOME;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    setPending(true);
    setError(null);
    try {
      await signUp(email, password);
      void navigate(from, { replace: true });
    } catch (err) {
      setError(authErrorMessage(err));
      setPending(false);
    }
  };

  return (
    <Modal label="Sign up">
      <Form onSubmit={(event) => void onSubmit(event)}>
        <h3>Sign up</h3>
        {!isAuthConfigured && <FormNotice>Accounts are disabled in this demo.</FormNotice>}
        <FormItem
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={setEmail}
          isValid={isEmailValid}
        />
        <FormItem
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
          isValid={isPasswordValid}
        />
        <FormNotice>
          8 to 15 characters with a lowercase letter, an uppercase letter, a digit and a symbol.
        </FormNotice>
        <FormError message={error} />
        <FormActions>
          <Button variant="danger" onClick={close}>
            Close
          </Button>
          <Button
            type="submit"
            disabled={!isEmailValid || !isPasswordValid || pending || !isAuthConfigured}
          >
            Sign up
          </Button>
        </FormActions>
      </Form>
    </Modal>
  );
}
