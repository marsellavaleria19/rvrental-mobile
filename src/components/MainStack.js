import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Reservation from '../screen/Reservation';
import Payment from '../screen/payment/Payment';
import BottomTabNav from './BottomNavigation';
import PaymentDetail from '../screen/payment/PaymentDetail';
import FinishPayment from '../screen/payment/FinishPayment';
import SuccessPayment from '../screen/payment/SuccessPayment';
import UpdateProfile from '../screen/profile/UpdateProfile';

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
               title: 'Payment',
            }}
            name="PaymentDetail"
            component={PaymentDetail}
         />
         <NavMainStack.Screen
            options={{
               title: 'Payment',
            }}
            name="FinishPayment"
            component={FinishPayment}
         />
         <NavMainStack.Screen
            options={{
               title: 'See history',
            }}
            name="SuccessPayment"
            component={SuccessPayment}
         />
         <NavMainStack.Screen
            options={{
               title: 'Update Profile',
            }}
            name="UpdateProfile"
            component={UpdateProfile}
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

export default MainStackNav;
