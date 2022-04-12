import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from '../router/AuthNavigator';
import {theme} from '../assets/styles/themeNativeBase';
import {useDispatch, useSelector} from 'react-redux';
import MainStackNav from '../router/MainStack';
import {useEffect} from 'react';
import {getDataUser} from '../redux/actions/auth';

const Main = () => {
   const {auth} = useSelector(state => state);
   const dispatch = useDispatch();

   useEffect(() => {
      if (auth.token !== null) {
         dispatch(getDataUser(auth.token));
      }
   }, [auth.token, dispatch]);

   return (
      <NativeBaseProvider theme={theme}>
         <NavigationContainer>
            {auth.token == null ? <AuthNavigator /> : <MainStackNav />}
         </NavigationContainer>
      </NativeBaseProvider>
   );
};

export default Main;
