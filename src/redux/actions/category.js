import {default as axios} from 'axios';
import AxiosCostum from '../../helpers/AxiosCostum';

export const getListCategory = () => {
   return {
      type: 'GET_CATEGORY',
      payload: AxiosCostum().get('/categories'),
   };
};
