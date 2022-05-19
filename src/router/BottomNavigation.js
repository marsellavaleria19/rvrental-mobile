import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeNavigator from './HomeNav';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HistoryTabNav from './HistoryTabNav';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonIcon from 'react-native-vector-icons/Ionicons';
import ProfileMenuList from '../screen/profile/ListMenuProfile';
import stylePrimary from '../assets/styles/stylePrimary';
import {StyleSheet} from 'react-native';
import {Center, View} from 'native-base';
import History from '../screen/HistoryCheckbox';

const NavBottomTabStack = createBottomTabNavigator();

const BottomTabNav = () => {
   const Icon = ({iconType, name, active, ...props}) => {
      let IconFamily;
      let style;
      if (iconType == 'FontAwesome') {
         IconFamily = IconFontAwesome;
      }
      if (iconType == 'IonIcon') {
         IconFamily = IconIonIcon;
      }

      if (active) {
         style = addStyles.iconStyleFocused;
      } else {
         style = addStyles.iconStyle;
      }
      return <IconFamily name={name} style={style} {...props} />;
   };

   return (
      <NavBottomTabStack.Navigator
         screenOptions={{headerShown: false, tabBarShowLabel: false}}>
         <NavBottomTabStack.Screen
            name="HomeNavigation"
            options={{
               tabBarStyle: addStyles.layoutHeader,
               tabBarIcon: ({focused, color, size}) => {
                  return (
                     <Icon
                        iconType="FontAwesome"
                        name="home"
                        active={focused}
                     />
                  );
               },
            }}
            component={HomeNavigator}
         />
         {/* <NavBottomTabStack.Screen
            name="HistoryNav"
            options={{
               tabBarStyle: addStyles.layoutHeader,
               tabBarIcon: ({focused, color, size}) => {
                  // You can return any component that you like here!
                  return (
                     <Icon
                        iconType="IonIcon"
                        name="md-document-text"
                        active={focused}
                     />
                  );
               },
            }}
            component={HistoryTabNav}
         /> */}

         <NavBottomTabStack.Screen
            name="History"
            options={{
               tabBarStyle: addStyles.layoutHeader,
               tabBarIcon: ({focused, color, size}) => {
                  // You can return any component that you like here!
                  return (
                     <Icon
                        iconType="IonIcon"
                        name="md-document-text"
                        active={focused}
                     />
                  );
               },
            }}
            component={History}
         />

         <NavBottomTabStack.Screen
            name="Chat"
            options={{
               tabBarStyle: addStyles.layoutHeader,
               tabBarIcon: ({focused, color, size}) => {
                  // You can return any component that you like here!
                  return (
                     <Icon
                        iconType="IonIcon"
                        name="chatbubble-sharp"
                        active={focused}
                     />
                  );
               },
            }}
            component={History}
         />
         <NavBottomTabStack.Screen
            name="Profile"
            options={{
               tabBarStyle: addStyles.layoutHeader,
               tabBarIcon: ({focused, color, size}) => {
                  // You can return any component that you like here!
                  return (
                     <Icon
                        iconType="FontAwesome"
                        name="user"
                        active={focused}
                     />
                  );
               },
            }}
            component={ProfileMenuList}
         />
      </NavBottomTabStack.Navigator>
   );
};

const addStyles = StyleSheet.create({
   layoutHeader: {
      backgroundColor: stylePrimary.mainColor,
      height: 60,
   },
   iconStyle: {
      color: stylePrimary.secondaryColor,
      fontSize: 30,
   },
   iconStyleFocused: {
      backgroundColor: stylePrimary.secondaryColor,
      color: stylePrimary.mainColor,
      fontSize: 30,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 5,
   },
});

export {addStyles};

export default BottomTabNav;
