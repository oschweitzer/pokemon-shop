import { TiShoppingCart } from 'react-icons/ti';
import { Link } from 'react-router';
import { CART } from '../../constants/routes';
import { useAppSelector } from '../../store/hooks';
import { selectCartCount } from '../../store/cartSlice';
import styles from './Cart.module.css';

export default function Cart() {
  const count = useAppSelector(selectCartCount);
  return (
    <Link to={CART} className={styles.Cart} aria-label={`Cart, ${count.toString()} items`}>
      <div className={styles.CartBox}>
        <span className={styles.Badge}>{count}</span>
        <TiShoppingCart className={styles.CartIcon} />
      </div>
    </Link>
  );
}
