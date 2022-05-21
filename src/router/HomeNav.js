import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import DetailCategory from '../screen/DetailCategory';
import Filter from '../screen/filter/Filter';
import AddItem from '../screen/item/AddItem';
import stylePrimary from '../assets/styles/stylePrimary';

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
            options={{
               headerStyle: addStyles.layoutHeader,
               headerTitleStyle: addStyles.textHeader,
               headerTintColor: stylePrimary.secondaryColor,
               title: 'Detail Category',
               headerBackTitleStyle: addStyles.headerBack,
            }}
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
         <NavHomeStack.Screen
            options={{
               headerStyle: addStyles.layoutHeader,
               headerTitleStyle: addStyles.textHeader,
               headerTintColor: stylePrimary.secondaryColor,
               headerBackTitleStyle: addStyles.headerBack,
               title: 'Add new item',
            }}
            name="AddItem"
            component={AddItem}
         />
      </NavHomeStack.Navigator>
   );
};

const addStyles = StyleSheet.create({
   layoutHeader: {
      backgroundColor: stylePrimary.mainColor,
   },
   textHeader: {
      color: stylePrimary.secondaryColor,
   },
   headerBack: {
      color: stylePrimary.secondaryColor,
      fontSize: 30,
   },
});

export {addStyles};

export default HomeNavigator;
