import {combineReducers} from 'redux';
import auth from './auth';
import storage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const persistForAuth = {
   key: 'auth',
   storage,
};

const rootReducers = combineReducers({
   auth: persistReducer(persistForAuth, auth),
});

export default rootReducers;
