import {combineReducers} from 'redux';
import auth from './auth';
import category from './category';
import storage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import vehicle from './vehicle';
import counter from './counter';
import reservation from './reservation';
import payment from './payment';
import history from './history';

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

const persistForHistory = {
   key: 'history',
   storage,
};

const rootReducers = combineReducers({
   auth: persistReducer(persistForAuth, auth),
   category: persistReducer(persistForCategory, category),
   vehicle: persistReducer(persistForVehicle, vehicle),
   reservation,
   payment,
   history: persistReducer(persistForHistory, history),
});

export default rootReducers;
