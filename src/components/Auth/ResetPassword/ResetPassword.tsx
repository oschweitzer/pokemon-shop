import { useState, type SubmitEvent } from 'react';
import { authErrorMessage, isAuthConfigured, resetPassword } from '../../../lib/auth';
import { validateEmail } from '../../../lib/validation';
import { useCloseModal } from '../../../hooks/useCloseModal';
import Button from '../../Button/Button';
import Form, { FormActions, FormError, FormNotice } from '../../Form/Form';
import FormItem from '../../Form/FormItem/FormItem';
import Modal from '../../Modal/Modal';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const close = useCloseModal();
  const isEmailValid = validateEmail(email);

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEmailValid) {
      return;
    }
    setPending(true);
    setError(null);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(authErrorMessage(err));
    }
    setPending(false);
  };

  return (
    <Modal label="Reset password">
      <Form onSubmit={(event) => void onSubmit(event)}>
        <h3>Reset password</h3>
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
        <FormError message={error} />
        {sent && (
          <FormNotice>If an account exists for this email, a reset link was sent.</FormNotice>
        )}
        <FormActions>
          <Button variant="danger" onClick={close}>
            Close
          </Button>
          <Button type="submit" disabled={!isEmailValid || pending || !isAuthConfigured}>
            Send
          </Button>
        </FormActions>
      </Form>
    </Modal>
  );
}
