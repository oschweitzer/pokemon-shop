import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import pokemonLogo from '../../assets/pokemon-logo.svg';
import { ACCOUNT, HOME, SHOP, SIGN_IN } from '../../constants/routes';
import { authErrorMessage, signOutUser } from '../../lib/auth';
import { useAppSelector } from '../../store/hooks';
import AuthBadge from '../Auth/AuthBadge/AuthBadge';
import Cart from '../Cart/Cart';
import styles from './NavigationBar.module.css';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.NavBarItemActive : undefined;

export default function NavigationBar() {
  const user = useAppSelector((state) => state.auth.email);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onSignOut = () => {
    signOutUser()
      .then(() => navigate(HOME))
      .catch((error: unknown) => {
        console.error(authErrorMessage(error));
      });
  };

  return (
    <nav className={styles.NavBar} aria-label="Main">
      <Link to={HOME} className={styles.LogoLink}>
        <img className={styles.Logo} alt="Pokémon" src={pokemonLogo} />
      </Link>
      <ul>
        <li>
          <NavLink end to={HOME} className={linkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink end to={SHOP} className={linkClass}>
            Shop
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink end to={ACCOUNT} className={linkClass}>
              My account
            </NavLink>
          </li>
        )}
      </ul>
      <div className={styles.RightContainer}>
        <AuthBadge user={user} onSignIn={() => void navigate(SIGN_IN)} onSignOut={onSignOut} />
        {pathname !== HOME && <Cart />}
      </div>
    </nav>
  );
}
