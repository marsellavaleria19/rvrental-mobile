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
import Favorite from '../screen/Favorite';
import AddItem from '../screen/item/AddItem';
import EditItem from '../screen/item/EditItem';
import UpdateItem from '../screen/item/UpdateItem';
import FilterMenu from '../screen/filter/FilterMenu';
import VerifyUserEmail from '../screen/auth/VerifyUserEmail';
import VerifyUser from '../screen/auth/VerifyUser';

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
               title: 'Favorite',
            }}
            name="Favorite"
            component={Favorite}
         />
         <NavMainStack.Screen
            options={{
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
               title: 'Filter',
            }}
            name="FilterMenu"
            component={FilterMenu}
         />
         <NavMainStack.Screen
            name="VerifyUserEmail"
            options={{
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
