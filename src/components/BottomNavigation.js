import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeNavigator from './HomeNav';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HistoryTabNav from './HistoryTabNav';
import IconHome from 'react-native-vector-icons/FontAwesome';
import IconHistory from 'react-native-vector-icons/Ionicons';

const NavBottomTabStack = createBottomTabNavigator();

const BottomTabNav = () => {
   return (
      <NavBottomTabStack.Navigator
         screenOptions={{headerShown: false, tabBarShowLabel: false}}>
         <NavBottomTabStack.Screen
            name="HomeNavigation"
            options={{
               tabBarIcon: ({focused, color, size}) => {
                  // You can return any component that you like here!
                  return <IconHome name="home" size={24} />;
               },
            }}
            component={HomeNavigator}
         />
         <NavBottomTabStack.Screen
            name="HistoryNav"
            options={{
               tabBarIcon: ({focused, color, size}) => {
                  // You can return any component that you like here!
                  return <IconHistory name="md-document-text" size={24} />;
               },
            }}
            component={HistoryTabNav}
         />
      </NavBottomTabStack.Navigator>
   );
};

export default BottomTabNav;
