import {default as axios} from 'axios';
import qs from 'qs';
import AxiosCostum from '../../helpers/AxiosCustom';

export const historyInput = (reservation, idUser, dataPayment, token) => {
   var data = {
      idUser,
      idVehicle: reservation.idVehicle,
      rentStartDate: reservation.rentStartDate,
      rentEndDate: reservation.rentEndDate,
      prepayment: 0,
      status: 1,
      qty: reservation.qty,
      idCard: dataPayment.idCard,
      fullname: dataPayment.fullname,
      mobilePhone: dataPayment.mobilePhone,
      emailAddress: dataPayment.emailAddress,
      location: dataPayment.location,
      payment_type: dataPayment.payment_type,
   };

   console.log(data);
   return {
      type: 'HISTORY',
      payload: AxiosCostum(token).post('/histories', qs.stringify(data)),
   };
};

export const getListHistory = token => {
   return {
      type: 'HISTORY',
      payload: AxiosCostum(token).get('/histories'),
   };
};

export const getDetailHistory = (token, id) => {
   return {
      type: 'HISTORY_DETAIL',
      payload: AxiosCostum(token).get(`/histories/${id}`),
   };
};

export const historyUpdate = (token, payment, id) => {
   var data = {
      prepayment: payment,
      status_id: 2,
   };
   // const param = new URLSearchParams();
   // param.append('prepayment', payment);
   // param.append('status_id', 2);
   return {
      type: 'HISTORY_DETAIL',
      payload: AxiosCostum(token).patch(`/histories/${id}`, qs.stringify(data)),
   };
};

export const getListFilterHistory = (token, search) => {
   return {
      type: 'HISTORY',
      payload: AxiosCostum(token).get(`/histories?search=${search}`),
   };
};

export const deleteHistory = (token, id) => {
   return {
      type: 'HISTORY',
      payload: AxiosCostum(token).delete(`/histories/${id}`),
   };
};
