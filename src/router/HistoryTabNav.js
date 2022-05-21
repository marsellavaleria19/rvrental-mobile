import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import History from '../screen/History';
import ChatList from '../screen/ChatList';
import {StyleSheet} from 'react-native';
import stylePrimary from '../assets/styles/stylePrimary';

const Tab = createMaterialTopTabNavigator();

const HistoryTabNav = () => {
   return (
      <Tab.Navigator>
         <Tab.Screen
            options={{
               tabBarStyle: addStyles.layoutHeader,
               tabBarLabelStyle: addStyles.label,
            }}
            name="Chat List"
            component={ChatList}
         />
         <Tab.Screen
            options={{
               tabBarStyle: addStyles.layoutHeader,
               tabBarLabelStyle: addStyles.label,
               title: 'History Order',
            }}
            name="History"
            component={History}
         />
      </Tab.Navigator>
   );
};

const addStyles = StyleSheet.create({
   layoutHeader: {
      backgroundColor: stylePrimary.mainColor,
      color: stylePrimary.background,
   },
   label: {
      color: stylePrimary.background,
   },
   labelActive: {
      color: stylePrimary.background,
   },
   iconStyleFocused: {
      backgroundColor: stylePrimary.background,
      color: stylePrimary.mainColor,
      fontSize: 30,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 5,
   },
});

export {addStyles};

export default HistoryTabNav;
