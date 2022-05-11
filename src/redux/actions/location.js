import {default as axios} from 'axios';
import AxiosCostum from '../../helpers/AxiosCustom';
import qs from 'qs';

export const getListLocation = () => {
   return {
      type: 'GET_LOCATION',
      payload: AxiosCostum().get('/locations'),
   };
};

export const addDataLocation = (token, locationSend) => {
   const data = {location: locationSend};
   return {
      type: 'GET_DETAIL_LOCATION',
      payload: AxiosCostum().post('/locations', qs.stringify(data)),
   };
};
