import React from 'react';
import Payment from './src/screen/payment/Payment';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {input, button} from './src/assets/styles/styleComponent';
import stylePrimary from './src/assets/styles/stylePrimary';
import {NavigationContainer} from '@react-navigation/native';
import NavMainStack from './src/components/MainStack';
import History from './src/screen/History';

const App = () => {
   const theme = extendTheme({
      components: {
         Input: {
            baseStyle: {
               backgroundColor: 'rgba(128, 128, 128, 0.2)',
               fontSize: 16,
               ...input,
               px: 5,
            },
         },
      },
   });
   return (
      <NativeBaseProvider theme={theme}>
         <NavigationContainer>
            <NavMainStack />
         </NavigationContainer>
      </NativeBaseProvider>
   );
};

export default App;
