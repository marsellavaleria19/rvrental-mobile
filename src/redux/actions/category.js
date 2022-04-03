import {default as axios} from 'axios';
import AxiosCostum from '../../helpers/AxiosCustom';

export const getListCategory = () => {
   return {
      type: 'GET_CATEGORY',
      payload: AxiosCostum().get('/categories'),
   };
};
