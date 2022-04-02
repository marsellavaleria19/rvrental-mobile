import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {input, button} from '../assets/styles/styleComponent';
import stylePrimary from '../assets/styles/stylePrimary';
import {NavigationContainer} from '@react-navigation/native';
import NavMainStack from '../components/MainStack';
import AuthNavigator from '../components/AuthNavigator';
import ChangePassword from './auth/ChangePassword';

const Main = () => {
   const theme = extendTheme({
      components: {
         Input: {
            baseStyle: {
               backgroundColor: 'rgba(128, 128, 128, 0.2)',
               fontSize: 16,
               ...input,
               px: 5,
            },
            variants: {
               profile: {
                  backgroundColor: 'rgba(52, 52, 52, 0.0)',
                  borderBottomWidth: 1,
                  borderBottomColor: '#9F9F9F',
                  _text: {
                     color: 'black',
                  },
               },
            },
         },
         FormControlLabel: {
            baseStyle: {
               _text: {
                  fontSize: 12,
                  color: '#B8B8B8',
                  fontWeight: 700,
               },
            },
            variants: {
               profile: {
                  px: 5,
               },
            },
         },
         TextArea: {
            variants: {
               profile: {
                  backgroundColor: 'rgba(52, 52, 52, 0.0)',
                  border: 'none',
                  borderBottomWidth: 1,
                  borderBottomColor: '#9F9F9F',
                  _text: {
                     color: 'black',
                  },
               },
            },
         },
         Radio: {
            baseStyle: {
               _text: {
                  color: stylePrimary.mainColor,
                  fontSize: 10,
               },
            },
         },
      },
   });
   return (
      <NativeBaseProvider theme={theme}>
         <NavigationContainer>
            <AuthNavigator />
         </NavigationContainer>
      </NativeBaseProvider>
   );
};

export default Main;
