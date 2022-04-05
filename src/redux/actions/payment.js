import {default as axios} from 'axios';
import qs from 'qs';
import AxiosCostum from '../../helpers/AxiosCustom';

export const getDetailPayment = id => {
   return {
      type: 'PAYMENT',
      payload: AxiosCostum().get(`/histories/${id}`),
   };
};

export const saveDataPayment = dataPayment => {
   var data = {
      idCard: dataPayment.idCard,
      fullname: `${dataPayment.firstname} ${dataPayment.lastname}`,
      mobilePhone: dataPayment.mobileNumber,
      emailAddress: dataPayment.email,
      location: dataPayment.location,
      payment_type: dataPayment.paymentType,
   };

   return {
      type: 'SAVE_PAYMENT',
      payload: data,
   };
};
