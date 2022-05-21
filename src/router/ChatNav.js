import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatList from '../screen/ChatList';
import DetailCategory from '../screen/DetailCategory';
import Filter from '../screen/filter/Filter';
import AddItem from '../screen/item/AddItem';
import stylePrimary from '../assets/styles/stylePrimary';

const NavChatStack = createNativeStackNavigator();
// const NavHomeStack = createNativeStackNavigator();

const ChatNavigator = () => {
   return (
      <NavChatStack.Navigator>
         <NavChatStack.Screen
            name="Chat"
            options={{
               headerStyle: addStyles.layoutHeader,
               headerTitleStyle: addStyles.textHeader,
               headerTintColor: stylePrimary.secondaryColor,
               headerBackTitleStyle: addStyles.headerBack,
            }}
            component={ChatList}
         />
      </NavChatStack.Navigator>
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

export default ChatNavigator;
