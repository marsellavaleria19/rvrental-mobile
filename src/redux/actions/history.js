import {default as axios} from 'axios';
import qs from 'qs';
import AxiosCostum from '../../helpers/AxiosCustom';
import moment from 'moment';

export const historyInput = (reservation, idUser, dataPayment, token) => {
   var data = {
      idUser,
      idVehicle: reservation.idVehicle.toString(),
      startRentDate: moment(reservation.rentStartDate).format('YYYY-MM-DD'),
      endRentDate: moment(reservation.rentEndDate).format('YYYY-MM-DD'),
      prepayment: 0,
      status: 1,
      qty: reservation.qty,
      idCard: dataPayment.idCard,
      fullname: dataPayment.fullname,
      mobilePhone: dataPayment.mobilePhone,
      emailAddress: dataPayment.emailAddress,
      location: dataPayment.location,
      payment_id: dataPayment.payment_id,
   };

   console.log(data);
   return {
      type: 'HISTORY_DETAIL',
      payload: AxiosCostum(token).post('/histories', qs.stringify(data)),
   };
};

export const getListHistory = token => {
   return {
      type: 'HISTORY',
      payload: AxiosCostum(token).get('/histories?limit=10'),
   };
};

export const getListHistoryByUserId = (token, id) => {
   return {
      type: 'HISTORY',
      payload: AxiosCostum(token).get(
         `/histories/user/${id}?sort=id&order=desc`,
      ),
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
      type: 'HISTORY_DELETE',
      payload: AxiosCostum(token).delete(`/histories/${id}`),
   };
};

export const deleteListHistory = (token, listHistory) => {
   return {
      type: 'HISTORY_DELETE',
      payload: Promise.all(
         listHistory.map(item => {
            const result = AxiosCostum(token).delete(`/histories/${item.id}`);
            return result;
         }),
      ),
   };
};

export const getNextListHistory = (token, url) => {
   return {
      type: 'HISTORY_NEXT',
      payload: AxiosCostum(token).get(url),
   };
};
