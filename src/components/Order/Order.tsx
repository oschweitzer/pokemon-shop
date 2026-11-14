import { FcPrint } from 'react-icons/fc';
import { Navigate, useNavigate } from 'react-router';
import { HOME } from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCart, selectCartItems } from '../../store/cartSlice';
import Button from '../Button/Button';
import Section from '../Section/Section';
import styles from './Order.module.css';

export default function Order() {
  const items = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return <Navigate to={HOME} replace />;
  }

  return (
    <Section>
      <h2>Recap</h2>
      <table className={styles.RecapTable}>
        <thead>
          <tr>
            <th>Pokémon name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.Actions}>
        <button
          type="button"
          className={styles.PrintButton}
          title="Print order"
          aria-label="Print order"
          onClick={() => {
            window.print();
          }}
        >
          <FcPrint />
        </button>
        <Button
          onClick={() => {
            dispatch(clearCart());
            void navigate(HOME);
          }}
        >
          OK
        </Button>
      </div>
    </Section>
  );
}
