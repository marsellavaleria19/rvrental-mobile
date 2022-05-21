import React from 'react';
import Main from './src/screen/Main';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ReduxStore from './src/redux/store';
import messaging from '@react-native-firebase/messaging';

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
