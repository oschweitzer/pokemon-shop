import React, { Component, Suspense } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Loading from './components/Loading/Loading';
import CartView from './components/CartView/CartView';
import Order from './components/Order/Order';
import Auth from './components/Auth/Auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FirebaseContext from './components/Firebase/context';

const Shop = React.lazy(() => import('./components/Shop/Shop'));
const UserAccount = React.lazy(() =>
  import('./components/UserAccount/UserAccount'),
);

class App extends Component {
  render() {
    let classes = 'MainSection';
    if (this.props.isModalActivated) {
      classes = ['MainSection', 'Modal'].join(' ');
    }

    return (
      <div className="App">
        <header className="App-header">
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
                <UserAccount />
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
