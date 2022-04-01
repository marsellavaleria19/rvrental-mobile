import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import DetailCategory from '../screen/DetailCategory';
import Filter from '../screen/Filter';

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
         <NavHomeStack.Screen
            name="DetailCategory"
            component={DetailCategory}
         />
         <NavHomeStack.Screen
            options={{
               headerShown: false,
            }}
            name="Filter"
            component={Filter}
         />
      </NavHomeStack.Navigator>
   );
};

export default HomeNavigator;
