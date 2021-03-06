import {default as axios} from 'axios';
import AxiosCostum from '../../helpers/AxiosCustom';
import qs from 'qs';

export const getListLocation = () => {
   return {
      type: 'GET_LOCATION',
      payload: AxiosCostum().get('/locations?limit=10'),
   };
};

export const addDataLocation = (token, locationSend) => {
   const data = {location: locationSend};
   return {
      type: 'ADD_LOCATION',
      payload: AxiosCostum(token).post('/locations', qs.stringify(data)),
   };
};
