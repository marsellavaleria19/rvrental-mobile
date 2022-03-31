import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeNavigator from './HomeNav';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const NavBottomTabStack = createBottomTabNavigator();

const BottomTabNav = () => {
   return (
      <NavBottomTabStack.Navigator
         screenOptions={{headerShown: false, tabBarShowLabel: false}}>
         <NavBottomTabStack.Screen
            name="HomeNavigation"
            component={HomeNavigator}
         />
      </NavBottomTabStack.Navigator>
   );
};

export default BottomTabNav;
