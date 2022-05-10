import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import Reservation from '../screen/Reservation';
import Payment from '../screen/payment/Payment';
import BottomTabNav from './BottomNavigation';
import PaymentDetail from '../screen/payment/PaymentDetail';
import FinishPayment from '../screen/payment/FinishPayment';
import SuccessPayment from '../screen/payment/SuccessPayment';
import UpdateProfile from '../screen/profile/UpdateProfile';
import Favorite from '../screen/Favorite';
import AddItem from '../screen/item/AddItem';
import EditItem from '../screen/item/EditItem';
import UpdateItem from '../screen/item/UpdateItem';
import FilterMenu from '../screen/filter/FilterMenu';
import VerifyUserEmail from '../screen/auth/VerifyUserEmail';
import VerifyUser from '../screen/auth/VerifyUser';
import stylePrimary from '../assets/styles/stylePrimary';

const NavMainStack = createNativeStackNavigator();

const MainStackNav = () => {
   return (
      <NavMainStack.Navigator>
         <NavMainStack.Screen
            options={{headerShown: false}}
            name="BottomNav"
            component={BottomTabNav}
         />
         <NavMainStack.Screen
            options={{headerShown: false}}
            name="Reservation"
            component={Reservation}
         />
         <NavMainStack.Screen name="Payment" component={Payment} />
         <NavMainStack.Screen
            options={{
               headerStyle: addStyles.layoutHeader,
               headerTitleStyle: addStyles.textHeader,
               headerTintColor: stylePrimary.thirdColor,
               headerBackTitleStyle: addStyles.headerBack,
               title: 'Payment',
            }}
            name="PaymentDetail"
            component={PaymentDetail}
         />
         <NavMainStack.Screen
            options={{
               headerStyle: addStyles.layoutHeader,
               headerTitleStyle: addStyles.textHeader,
               headerTintColor: stylePrimary.thirdColor,
               headerBackTitleStyle: addStyles.headerBack,
               title: 'Payment',
            }}
            name="FinishPayment"
            component={FinishPayment}
         />
         <NavMainStack.Screen
            options={{
               headerStyle: addStyles.layoutHeader,
               headerTitleStyle: addStyles.textHeader,
               headerTintColor: stylePrimary.thirdColor,
               headerBackTitleStyle: addStyles.headerBack,
               title: 'See history',
            }}
            name="SuccessPayment"
            component={SuccessPayment}
         />
         <NavMainStack.Screen
            options={{
               headerStyle: addStyles.layoutHeader,
               headerTitleStyle: addStyles.textHeader,
               headerTintColor: stylePrimary.thirdColor,
               headerBackTitleStyle: addStyles.headerBack,
               title: 'Favorite',
            }}
            name="Favorite"
            component={Favorite}
         />
         <NavMainStack.Screen
            options={{
               headerStyle: addStyles.layoutHeader,
               headerTitleStyle: addStyles.textHeader,
               headerTintColor: stylePrimary.thirdColor,
               headerBackTitleStyle: addStyles.headerBack,
               title: 'Update Profile',
            }}
            name="UpdateProfile"
            component={UpdateProfile}
         />
         <NavMainStack.Screen
            options={{
               headerShown: false,
            }}
            name="EditItem"
            component={EditItem}
         />
         <NavMainStack.Screen
            options={{
               headerShown: false,
            }}
            name="UpdateItem"
            component={UpdateItem}
         />
         <NavMainStack.Screen
            options={{
               headerStyle: addStyles.layoutHeader,
               headerTitleStyle: addStyles.textHeader,
               headerTintColor: stylePrimary.thirdColor,
               headerBackTitleStyle: addStyles.headerBack,
               title: 'Filter',
            }}
            name="FilterMenu"
            component={FilterMenu}
         />
         <NavMainStack.Screen
            name="VerifyUserEmail"
            options={{
               headerStyle: addStyles.layoutHeader,
               headerTitleStyle: addStyles.textHeader,
               headerTintColor: stylePrimary.thirdColor,
               headerBackTitleStyle: addStyles.headerBack,
               title: 'Verify User Email',
            }}
            component={VerifyUserEmail}
         />
         <NavMainStack.Screen
            name="VerifyUser"
            options={{
               title: 'Verify User',
            }}
            component={VerifyUser}
         />
         <NavMainStack.Screen
            name="NotFound"
            options={{
               title: 'Verify User',
            }}
            component={VerifyUser}
         />
         {/* <NavMainStack.Screen name="Reservation" component={Reservation} />
         <NavMainStack.Screen name="PaymentDetail" component={PaymentDetail} />
         <NavMainStack.Screen name="FinishPayment" component={FinishPayment} />
         <NavMainStack.Screen
            name="SuccessPayment"
            component={SuccessPayment}
         /> */}
      </NavMainStack.Navigator>
   );
};

const addStyles = StyleSheet.create({
   layoutHeader: {
      backgroundColor: stylePrimary.mainColor,
   },
   textHeader: {
      color: stylePrimary.thirdColor,
   },
   headerBack: {
      color: stylePrimary.thirdColor,
      fontSize: 30,
   },
});

export {addStyles};

export default MainStackNav;
