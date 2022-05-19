import {default as axios} from 'axios';
import AxiosCostum from '../../helpers/AxiosCustom';
import qs from 'qs';

export const getListCategory = () => {
   return {
      type: 'GET_CATEGORY',
      payload: AxiosCostum().get('/categories?limit=10'),
   };
};

export const addDataCategory = (token, category) => {
   const data = {name: category};
   return {
      type: 'ADD_CATEGORY',
      payload: AxiosCostum(token).post('/categories', qs.stringify(data)),
   };
};
