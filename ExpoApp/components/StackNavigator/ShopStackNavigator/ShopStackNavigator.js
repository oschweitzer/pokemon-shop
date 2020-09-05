import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Shop from '../../Shop/Shop';

const ShopStackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={'Shop'} component={Shop} />
    </Stack.Navigator>
  );
};

export default ShopStackNavigator;
