import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import styles from './App.module.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './components/Home/Home';
import Loading from './components/Loading/Loading';
import CartView from './components/Cart/CartView/CartView';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FirebaseContext from './components/Firebase/context';
import {
  ACCOUNT,
  CART,
  HOME,
  ORDER_RECAP,
  RESET_PASSWORD,
  SHOP,
  SIGN_IN,
  SIGN_UP,
} from './constants/routes';

const Shop = React.lazy(() => import('./components/Shop/Shop'));
const UserAccount = React.lazy(() =>
  import('./components/UserAccount/UserAccount'),
);
const Order = React.lazy(() => import('./components/Order/Order'));
const Login = React.lazy(() => import('./components/Auth/Login/Login'));
const ResetPassword = React.lazy(() =>
  import('./components/Auth/ResetPassword/ResetPassword'),
);
const SignUp = React.lazy(() => import('./components/Auth/SignUp/SignUp'));

class App extends Component {
  render() {
    let classes = styles.MainSection;
    if (this.props.isModalActivated) {
      classes = [styles.MainSection, styles.Modal].join(' ');
    }

    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <FirebaseContext.Consumer>
            {(firebase) => <NavigationBar firebase={firebase} />}
          </FirebaseContext.Consumer>
        </header>
        <section className={classes}>
          <Switch>
            <Route exact path={HOME}>
              <Home />
            </Route>
            <Route exact path={SHOP}>
              <Suspense fallback={<Loading />}>
                <Shop />
              </Suspense>
            </Route>
            <Route exact path={ACCOUNT}>
              <Suspense fallback={<Loading />}>
                <FirebaseContext.Consumer>
                  {(firebase) => <UserAccount firebase={firebase} />}
                </FirebaseContext.Consumer>
              </Suspense>
            </Route>
            <Route exact path={CART}>
              <Suspense fallback={<Loading />}>
                <CartView />
              </Suspense>
            </Route>
            <Route exact path={ORDER_RECAP}>
              <Suspense fallback={<Loading />}>
                <Order />
              </Suspense>
            </Route>
            <Route exact path={SIGN_IN}>
              <Suspense fallback={<Loading />}>
                <FirebaseContext.Consumer>
                  {(firebase) => <Login firebase={firebase} />}
                </FirebaseContext.Consumer>
              </Suspense>
            </Route>
            <Route exact path={SIGN_UP}>
              <Suspense fallback={<Loading />}>
                <FirebaseContext.Consumer>
                  {(firebase) => <SignUp firebase={firebase} />}
                </FirebaseContext.Consumer>
              </Suspense>
            </Route>
            <Route exact path={RESET_PASSWORD}>
              <Suspense fallback={<Loading />}>
                <FirebaseContext.Consumer>
                  {(firebase) => <ResetPassword firebase={firebase} />}
                </FirebaseContext.Consumer>
              </Suspense>
            </Route>
          </Switch>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isModalActivated: state.modalReducer.isModalActivated,
  };
};

App.propTypes = {
  isModalActivated: PropTypes.bool,
  history: PropTypes.object,
};

export default withRouter(connect(mapStateToProps)(App));
