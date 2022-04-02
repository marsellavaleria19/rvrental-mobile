import {combineReducers} from 'redux';
import auth from './auth';
import category from './category';
import storage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import vehicle from './vehicle';

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

const rootReducers = combineReducers({
   auth: persistReducer(persistForAuth, auth),
   category: persistReducer(persistForCategory, category),
   vehicle: persistReducer(persistForVehicle, vehicle),
});

export default rootReducers;
