import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screen/auth/Login';
import Signup from '../screen/auth/Signup';
import ForgotPassowrd from '../screen/auth/ForgotPassword';

const NavAuthStack = createNativeStackNavigator();
// const NavHomeStack = createNativeStackNavigator();

const AuthNavigator = () => {
   return (
      <NavAuthStack.Navigator>
         <NavAuthStack.Screen
            name="Login"
            options={{
               headerShown: false,
            }}
            component={Login}
         />
         <NavAuthStack.Screen
            options={{
               headerShown: false,
            }}
            name="Signup"
            component={Signup}
         />
         <NavAuthStack.Screen
            name="ForgotPassword"
            options={{
               headerShown: false,
            }}
            component={ForgotPassowrd}
         />
      </NavAuthStack.Navigator>
   );
};

export default AuthNavigator;
