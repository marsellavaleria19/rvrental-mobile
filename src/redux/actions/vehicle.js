import {default as axios} from 'axios';
import AxiosCustom from '../../helpers/AxiosCustom';

export const getListVehicle = () => {
   return {
      type: 'GET_VEHICLE',
      payload: AxiosCustom().get(`/vehicles?limit=20`),
   };
};

export const getListVehicleByCategory = idCategory => {
   return {
      type: 'GET_VEHICLE',
      payload: AxiosCustom().get(`/vehicles/category/${idCategory}?limit=20`),
   };
};

export const getListVehicleByUrl = url => {
   return {
      type: 'GET_VEHICLE_NEXT',
      payload: AxiosCustom().get(`${url}`),
   };
};

export const getDetailVehicle = id => {
   return {
      type: 'GET_VEHICLE',
      payload: AxiosCustom().get(`/vehicles/${id}`),
   };
};
