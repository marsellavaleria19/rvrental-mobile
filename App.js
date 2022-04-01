import React from 'react';
import Payment from './src/screen/payment/Payment';
import {View} from 'react-native';
import Login from './src/screen/auth/Login';
import Signup from './src/screen/auth/Signup';
import ForgotPassowrd from './src/screen/auth/ForgotPassword';
import {NavigationContainer} from '@react-navigation/native';
import AuthNav from './src/components/AuthNavigator';
import NavMainStack from './src/components/MainStack';
import Reservation from './src/screen/Reservation';
import {NativeBaseProvider, extendTheme} from 'native-base';

const App = () => {
   const theme = extendTheme({
      components: {
         Input: {
            baseStyle: {
               rounded: 'md',
               backgroundColor: '#DFDEDE',
            },
         },
      },
   });
   return (
      <NativeBaseProvider theme={theme}>
         {/* <NavigationContainer>
            <NavMainStack />
         </NavigationContainer> */}
         <Payment />
      </NativeBaseProvider>
   );
};

export default App;
