import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';

const NavHomeStack = createNativeStackNavigator();
// const NavHomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
   return (
      <NavHomeStack.Navigator>
         <NavHomeStack.Screen
            name="Home"
            options={{
               headerShown: false,
            }}
            component={Home}
         />
      </NavHomeStack.Navigator>
   );
};

export default HomeNavigator;
