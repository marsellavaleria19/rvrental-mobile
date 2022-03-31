import React from 'react';

import {View} from 'react-native';
import Login from './src/screen/auth/Login';
import Signup from './src/screen/auth/Signup';
import ForgotPassowrd from './src/screen/auth/ForgotPassword';
import {NavigationContainer} from '@react-navigation/native';
import AuthNav from './src/components/NavigatorAuth';

const App = () => {
   return (
      <NavigationContainer>
         <AuthNav />
      </NavigationContainer>
   );
};

export default App;
