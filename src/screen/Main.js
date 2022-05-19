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
import {getListVehicleByCategory} from '../redux/actions/vehicle';
import {getListLocation} from '../redux/actions/location';
import {getListPaymentType} from '../redux/actions/payment';
import {getListHistory, getListHistoryByUserId} from '../redux/actions/history';
import Payment from './payment/Payment';
import {LIMIT_CATEGORY} from '@env';

const Main = () => {
   const {auth, category, vehicle, payment} = useSelector(state => state);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch({
         type: 'CLEAR_VEHICLE',
      });
      dispatch(getListCategory());
      dispatch(getListLocation());
      dispatch(getListPaymentType());
   }, []);

   useEffect(() => {
      dispatch({
         type: 'CLEAR_VEHICLE',
      });
      if (category.listCategory.length > 0) {
         category.listCategory.forEach(itemCategory => {
            dispatch(
               getListVehicleByCategory(
                  itemCategory.id,
                  LIMIT_CATEGORY,
                  'home',
               ),
            );
         });
      }
   }, [category.listCategory]);

   useEffect(() => {
      if (auth.token !== null) {
         dispatch(getDataUser(auth.token));
         if (auth.user.role !== 'admin') {
            dispatch(getListHistoryByUserId(auth.token, auth.user.id));
         } else {
            dispatch(getListHistory(auth.token));
         }
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
