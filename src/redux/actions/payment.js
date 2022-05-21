import {default as axios} from 'axios';
import qs from 'qs';
import AxiosCostum from '../../helpers/AxiosCustom';

export const getDetailPayment = id => {
   return {
      type: 'PAYMENT',
      payload: AxiosCostum().get(`/histories/${id}`),
   };
};

export const saveDataPayment = (dataPayment, paymentType) => {
   var data = {
      idCard: dataPayment['id card'],
      fullname: `${dataPayment.firstname} ${dataPayment.lastname}`,
      mobilePhone: dataPayment['mobile number'],
      emailAddress: dataPayment.email,
      location: dataPayment.location,
      payment_id: dataPayment['payment type'],
      paymentType: paymentType.payment,
   };

   return {
      type: 'SAVE_PAYMENT',
      payload: data,
   };
};

export const getListPaymentType = () => {
   return {
      type: 'PAYMENT_TYPE',
      payload: AxiosCostum().get('/payment-types?limit=20'),
   };
};
