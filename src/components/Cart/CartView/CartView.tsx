import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { ORDER_RECAP } from '../../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeItem, selectCartItems, updateQuantity } from '../../../store/cartSlice';
import Button from '../../Button/Button';
import Section from '../../Section/Section';
import PokemonItem from '../../Shop/PokemonList/PokemonItem/PokemonItem';
import styles from './CartView.module.css';

export default function CartView() {
  const items = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Section>
        <h2>Your cart is empty</h2>
      </Section>
    );
  }

  return (
    <Section>
      <h2>Your cart</h2>
      <ul className={styles.Items}>
        {items.map((item) => (
          <li key={item.id} className={styles.Item}>
            <PokemonItem id={item.id} name={item.name} />
            <div className={styles.ItemQuantity}>
              <label htmlFor={`quantity_${item.id.toString()}`}>Quantity: </label>
              <input
                className={styles.QuantityInput}
                id={`quantity_${item.id.toString()}`}
                type="number"
                min={1}
                value={item.quantity}
                onChange={(event) => {
                  const quantity = event.target.valueAsNumber;
                  if (!Number.isNaN(quantity)) {
                    dispatch(updateQuantity({ id: item.id, quantity }));
                  }
                }}
              />
              <button
                type="button"
                className={styles.RemoveItemButton}
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => dispatch(removeItem(item.id))}
              >
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => {
          void navigate(ORDER_RECAP);
        }}
      >
        Order
      </Button>
    </Section>
  );
}
