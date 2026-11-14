import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import styles from './App.module.css';
import Home from './components/Home/Home';
import Loading from './components/Loading/Loading';
import NavigationBar from './components/NavigationBar/NavigationBar';
import {
  ACCOUNT,
  CART,
  HOME,
  MODAL_ROUTES,
  ORDER_RECAP,
  RESET_PASSWORD,
  SHOP,
  SIGN_IN,
  SIGN_UP,
} from './constants/routes';
import { watchUser } from './lib/auth';
import { useAppDispatch } from './store/hooks';
import { userChanged } from './store/authSlice';

const Shop = lazy(() => import('./components/Shop/Shop'));
const UserAccount = lazy(() => import('./components/UserAccount/UserAccount'));
const CartView = lazy(() => import('./components/Cart/CartView/CartView'));
const Order = lazy(() => import('./components/Order/Order'));
const Login = lazy(() => import('./components/Auth/Login/Login'));
const SignUp = lazy(() => import('./components/Auth/SignUp/SignUp'));
const ResetPassword = lazy(() => import('./components/Auth/ResetPassword/ResetPassword'));

export default function App() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isModal = MODAL_ROUTES.includes(pathname);

  useEffect(
    () =>
      watchUser((email) => {
        dispatch(userChanged(email));
      }),
    [dispatch],
  );

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <NavigationBar />
      </header>
      <main className={isModal ? [styles.MainSection, styles.Modal].join(' ') : styles.MainSection}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={HOME} element={<Home />} />
            <Route path={SHOP} element={<Shop />} />
            <Route path={ACCOUNT} element={<UserAccount />} />
            <Route path={CART} element={<CartView />} />
            <Route path={ORDER_RECAP} element={<Order />} />
            <Route path={SIGN_IN} element={<Login />} />
            <Route path={SIGN_UP} element={<SignUp />} />
            <Route path={RESET_PASSWORD} element={<ResetPassword />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
