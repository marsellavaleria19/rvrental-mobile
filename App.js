import React from 'react';

import {View} from 'react-native';
import Login from './src/screen/auth/Login';
import Signup from './src/screen/auth/Signup';
import ForgotPassowrd from './src/screen/auth/ForgotPassword';
import {NavigationContainer} from '@react-navigation/native';
import AuthNav from './src/components/AuthNavigator';
import NavMainStack from './src/components/MainStack';
import Reservation from './src/screen/Reservation';

const App = () => {
   return (
      <NavigationContainer>
         <NavMainStack />
      </NavigationContainer>
   );
};

export default App;
