import {combineReducers} from 'redux';
import auth from './auth';
import category from './category';
import storage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import vehicle from './vehicle';
import counter from './counter';
import reservation from './reservation';
import payment from './payment';

const persistForAuth = {
   key: 'auth',
   storage,
};

const persistForCategory = {
   key: 'category',
   storage,
};

const persistForVehicle = {
   key: 'vehicle',
   storage,
};

const persistForReservation = {
   key: 'reservation',
   storage,
};

const persistForPayment = {
   key: 'payment',
   storage,
};

const rootReducers = combineReducers({
   auth: persistReducer(persistForAuth, auth),
   category: persistReducer(persistForCategory, category),
   vehicle: persistReducer(persistForVehicle, vehicle),
   reservation: persistReducer(persistForReservation, reservation),
   payment: persistReducer(persistForPayment, payment),
});

export default rootReducers;
