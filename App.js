import React, {useEffect} from 'react';
import Payment from './src/screen/payment/Payment';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {input, button} from './src/assets/styles/styleComponent';
import stylePrimary from './src/assets/styles/stylePrimary';
import {NavigationContainer} from '@react-navigation/native';
import NavMainStack from './src/components/MainStack';
import History from './src/screen/History';
import Main from './src/screen/Main';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ReduxStore from './src/redux/store';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const App = () => {
   const {store, persistor} = ReduxStore();
   const getToken = async () => {
      const token = await messaging().getToken();
      console.log(token);
   };

   // useEffect(() => {

   // }, []);
   return (
      <>
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
               <Main />
            </PersistGate>
         </Provider>
      </>
      // <NativeBaseProvider theme={theme}>
      //    <NavigationContainer>
      //       <NavMainStack />
      //    </NavigationContainer>
      // </NativeBaseProvider>
   );
};

export default App;
