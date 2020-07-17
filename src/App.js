import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import styles from './App.module.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './components/Home/Home';
import Loading from './components/Loading/Loading';
import CartView from './components/CartView/CartView';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FirebaseContext from './components/Firebase/context';
const Shop = React.lazy(() => import('./components/Shop/Shop'));
const UserAccount = React.lazy(() =>
  import('./components/UserAccount/UserAccount'),
);
const Auth = React.lazy(() => import('./components/Auth/Auth'));
const Order = React.lazy(() => import('./components/Order/Order'));

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
            <Route exact path={'/'}>
              <Home />
            </Route>
            <Route exact path={'/shop'}>
              <Suspense fallback={<Loading />}>
                <Shop />
              </Suspense>
            </Route>
            <Route exact path={'/account'}>
              <Suspense fallback={<Loading />}>
                <FirebaseContext.Consumer>
                  {(firebase) => <UserAccount firebase={firebase} />}
                </FirebaseContext.Consumer>
              </Suspense>
            </Route>
            <Route exact path={'/cart'}>
              <Suspense fallback={<Loading />}>
                <CartView />
              </Suspense>
            </Route>
            <Route exact path={'/order/recap'}>
              <Suspense fallback={<Loading />}>
                <Order />
              </Suspense>
            </Route>
            <Route exact path={'/signin'}>
              <Suspense fallback={<Loading />}>
                <FirebaseContext.Consumer>
                  {(firebase) => (
                    <Auth
                      title={'Login'}
                      validationButtonText={'Login'}
                      firebase={firebase}
                    />
                  )}
                </FirebaseContext.Consumer>
              </Suspense>
            </Route>
            <Route exact path={'/signup'}>
              <Suspense fallback={<Loading />}>
                <FirebaseContext.Consumer>
                  {(firebase) => (
                    <Auth
                      isSignUp={true}
                      title={'Sign up'}
                      validationButtonText={'Sign up'}
                      firebase={firebase}
                    />
                  )}
                </FirebaseContext.Consumer>
              </Suspense>
            </Route>
            <Route exact path={'/resetPassword'}>
              <Suspense fallback={<Loading />}>
                <FirebaseContext.Consumer>
                  {(firebase) => (
                    <Auth
                      displayResetPasswordModal={true}
                      title={'Reset password'}
                      validationButtonText={'Send'}
                      firebase={firebase}
                    />
                  )}
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
