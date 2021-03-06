import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { combineReducers, createStore } from 'redux';
import cartReducer from './reducers/cartReducer';
import { Provider } from 'react-redux';
import navBarReducer from './reducers/navBarReducer';
import authReducer from './reducers/authReducer';
import { BrowserRouter } from 'react-router-dom';
import FirebaseContext from './components/Firebase/context';
import Firebase from './components/Firebase/Firebase';
import modalReducer from './reducers/modalReducer';

const rootReducer = combineReducers({
  cartReducer,
  navBarReducer,
  authReducer,
  modalReducer,
});
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <FirebaseContext.Provider value={new Firebase()}>
          <App />
        </FirebaseContext.Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
