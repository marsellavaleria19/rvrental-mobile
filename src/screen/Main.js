/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from '../router/AuthNavigator';
import {theme} from '../assets/styles/themeNativeBase';
import {useDispatch, useSelector} from 'react-redux';
import MainStackNav from '../router/MainStack';
import {useEffect} from 'react';
import {getDataUser} from '../redux/actions/auth';
import RNBootSplash from 'react-native-bootsplash';
import {getListCategory} from '../redux/actions/category';
import {getListLocation} from '../redux/actions/location';

const Main = () => {
   const {auth} = useSelector(state => state);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getListCategory());
      dispatch(getListLocation());
   }, []);

   useEffect(() => {
      if (auth.token !== null) {
         dispatch(getDataUser(auth.token));
      }
   }, [auth.token]);

   return (
      <NativeBaseProvider theme={theme}>
         <NavigationContainer onReady={() => RNBootSplash.hide()}>
            {auth.token == null ? <AuthNavigator /> : <MainStackNav />}
         </NavigationContainer>
      </NativeBaseProvider>
   );
};

export default Main;
