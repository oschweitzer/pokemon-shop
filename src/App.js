import React, { Suspense } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Loading from './components/Loading/Loading';
import CartView from './components/CartView/CartView';
import Order from './components/Order/Order';

const Shop = React.lazy(() => import('./components/Shop/Shop'));
const UserAccount = React.lazy(() =>
  import('./components/UserAccount/UserAccount'),
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavigationBar />
        </header>
        <section className={'MainSection'}>
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
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
};

export default App;
