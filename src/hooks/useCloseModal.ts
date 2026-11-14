import { useLocation, useNavigate } from 'react-router';
import { HOME } from '../constants/routes';

/** Leave a modal route: go back when there is a page to go back to, else go home. */
export function useCloseModal(): () => void {
  const navigate = useNavigate();
  const location = useLocation();
  return () => {
    if (location.key === 'default') {
      void navigate(HOME);
    } else {
      void navigate(-1);
    }
  };
}
