import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../Home/Home';
import Shop from '../../Shop/Shop';

const MainStackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={'Home'} component={Home} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
