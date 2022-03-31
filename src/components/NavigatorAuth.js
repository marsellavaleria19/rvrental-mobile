import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screen/Login';
import Signup from '../screen/Signup';
import ForgotPassowrd from '../screen/ForgotPassword';

const NavAuthStack = createNativeStackNavigator();

const AtuhNav = () => {
   return (
      <NavAuthStack.Navigator>
         <NavAuthStack.Screen name="Login" component={Login} />
         <NavAuthStack.Screen name="Signup" component={Signup} />
         <NavAuthStack.Screen
            name="ForgotPassword"
            component={ForgotPassowrd}
         />
      </NavAuthStack.Navigator>
   );
};

export default AtuhNav;
