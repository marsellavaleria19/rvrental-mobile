import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeNavigator from './HomeNav';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HistoryTabNav from './HistoryTabNav';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconHistory from 'react-native-vector-icons/Ionicons';
import ProfileMenuList from '../screen/profile/ListMenuProfile';

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
                  return <IconFontAwesome name="home" size={24} />;
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
         <NavBottomTabStack.Screen
            name="Profile"
            options={{
               tabBarIcon: ({focused, color, size}) => {
                  // You can return any component that you like here!
                  return <IconFontAwesome name="user" size={24} />;
               },
            }}
            component={ProfileMenuList}
         />
      </NavBottomTabStack.Navigator>
   );
};

export default BottomTabNav;
