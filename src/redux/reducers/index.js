import {combineReducers} from 'redux';
import auth from './auth';
import category from './category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import vehicle from './vehicle';
import counter from './counter';
import reservation from './reservation';
import payment from './payment';
import history from './history';
import search from './search';
import favorite from './favorite';
import location from './location';

const persistForAuth = {
   key: 'auth',
   storage: AsyncStorage,
};

const persistForCategory = {
   key: 'category',
   storage: AsyncStorage,
};

const persistForVehicle = {
   key: 'vehicle',
   storage: AsyncStorage,
};

const persistForHistory = {
   key: 'history',
   storage: AsyncStorage,
};

const rootReducers = combineReducers({
   auth: persistReducer(persistForAuth, auth),
   vehicle,
   category: persistReducer(persistForCategory, category),
   // vehicle: persistReducer(persistForVehicle, vehicle),
   reservation,
   payment,
   history: persistReducer(persistForHistory, history),
   search,
   favorite,
   location,
});

export default rootReducers;
