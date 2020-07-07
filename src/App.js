import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import {UserAccount} from './components/UserAccount/UserAccount';

const App = () => {
  return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <NavigationBar/>
          </header>
          <section className={"MainSection"}>
            <Switch>
              <Route exact path={'/'}>
                <Home/>
              </Route>
              <Route exact path={'/shop'}>
                <Shop/>
              </Route>
              <Route exact path={'/account'}>
                <UserAccount/>
              </Route>
            </Switch>
          </section>
        </div>
      </BrowserRouter>
  );
}

export default App;
