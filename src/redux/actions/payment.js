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
      fullname: `${dataPayment.firstname} ${dataPayment.lastname}`,
      mobilePhone: dataPayment.mobileNumber,
      emailAddress: dataPayment.email,
      location: dataPayment.location,
      payment_type: dataPayment.paymentType,
   };

   console.log(data);
   return {
      type: 'PAYMENT',
      payload: AxiosCostum(token).post('/histories', qs.stringify(data)),
   };
};

export const getDetailPayment = id => {
   return {
      type: 'PAYMENT',
      payload: AxiosCostum().get(`/histories/${id}`),
   };
};

export const paymentUpdate = (token, payment, id) => {
   var data = {
      prepayment: payment,
      status_id: 2,
   };
   // const param = new URLSearchParams();
   // param.append('prepayment', payment);
   // param.append('status_id', 2);
   return {
      type: 'PAYMENT',
      payload: AxiosCostum(token).patch(`/histories/${id}`, qs.stringify(data)),
   };
};

export const saveDataPayment = (reservation, idUser, dataPayment) => {
   var data = {
      idUser,
      idVehicle: reservation.idVehicle,
      rentStartDate: reservation.rentStartDate,
      rentEndDate: reservation.rentEndDate,
      prepayment: 0,
      status: 1,
      qty: reservation.qty,
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
