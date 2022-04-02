import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducers from './reducers';
import {persistStore} from 'redux-persist';
import promise from 'redux-promise-middleware';

export default () => {
   const store = createStore(rootReducers, applyMiddleware(promise, logger));
   const persistor = persistStore(store);
   return {store, persistor};
};
