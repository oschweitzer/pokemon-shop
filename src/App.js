import React from 'react';
import './App.css';
import {NavigationBar} from './components/NavigationBar/NavigationBar';
import {BrowserRouter} from 'react-router-dom';
import Home from './components/Home/Home';

const App = () => {

  return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <NavigationBar/>
          </header>
          <section>
            <Home/>
          </section>
        </div>
      </BrowserRouter>
  );
}

export default App;
