import React, { Component } from 'react';
import Home from './components/Home/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStackNavigator from './components/StackNavigator/MainStackNavigator/MainStackNavigator';
import ShopStackNavigator from './components/StackNavigator/ShopStackNavigator/ShopStackNavigator';
import { combineReducers, createStore } from 'redux';
import cartReducer from './reducers/cartReducer';
import navBarReducer from './reducers/navBarReducer';
import modalReducer from './reducers/modalReducer';
import authReducer from './reducers/authReducer';
import { Provider } from 'react-redux';

const Drawer = createDrawerNavigator();
const rootReducer = combineReducers({
  cartReducer,
  navBarReducer,
  authReducer,
  modalReducer,
});
const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer
          theme={{
            dark: false,
            colors: {
              background: 'rgb(250,235,215)',
            },
          }}
        >
          <Drawer.Navigator initialRouteName={'Home'}>
            <Drawer.Screen name="Home" component={MainStackNavigator} />
            <Drawer.Screen name={'Shop'} component={ShopStackNavigator} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
