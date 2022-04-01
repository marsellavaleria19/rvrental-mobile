import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Reservation from '../screen/Reservation';
// import PaymentDetail from '../screen/payment/PaymentDetail';
// import SuccessPayment from '../screen/payment/SuccessPayment';
// import FinishPayment from '../screen/payment/FinishPayment';
import BottomTabNav from './BottomNavigation';

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
