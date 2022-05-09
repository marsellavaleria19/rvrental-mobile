import {default as axios} from 'axios';
import AxiosCustom from '../../helpers/AxiosCustom';
import RNFetchBlob from 'rn-fetch-blob';

export const getListVehicle = () => {
   return {
      type: 'GET_VEHICLE',
      payload: AxiosCustom().get('/vehicles?limit=20'),
   };
};

export const getListVehicleByCategory = (idCategory, limit) => {
   return {
      type: 'GET_VEHICLE',
      payload: AxiosCustom().get(
         `/vehicles/category/${idCategory}?limit=${limit}`,
      ),
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
      type: 'GET_DETAIL_VEHICLE',
      payload: AxiosCustom().get(`/vehicles/${id}`),
   };
};

export const saveDetailVehicle = item => {
   return {
      type: 'SAVE_DETAIL_VEHICLE',
      payload: item,
   };
};
export const addDataVehicle = (token, dataSend, image) => {
   var dataVehicle = [];
   dataVehicle.push({
      name: 'photo',
      filename: image.fileName,
      type: image.type,
      data: RNFetchBlob.wrap(image.uri),
   });
   Object.keys(dataSend).forEach(key => {
      dataVehicle.push({name: `${key}`, data: dataSend[key]});
   });
   return {
      type: 'GET_RESULT_VEHICLE',
      payload: RNFetchBlob.fetch(
         'POST',
         'http://192.168.1.2:5000/vehicles',
         {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
         },
         dataVehicle,
      ),
   };
};

export const updateDataVehicle = (token, dataSend, id, image = null) => {
   var dataVehicle = [];

   if (image !== null) {
      dataVehicle.push({
         name: 'photo',
         filename: image.fileName,
         type: image.type,
         data: RNFetchBlob.wrap(image.uri),
      });
   }
   Object.keys(dataSend).forEach(key => {
      dataVehicle.push({name: `${key}`, data: dataSend[key]});
   });
   return {
      type: 'GET_RESULT_VEHICLE',
      payload: RNFetchBlob.fetch(
         'PATCH',
         `http://192.168.1.2:5000/vehicles/${id}`,
         {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
         },
         dataVehicle,
      ),
   };
};

export const deleteDataVehicle = (token, id) => {
   return {
      type: 'GET_DELETE_VEHICLE',
      payload: AxiosCustom(token).delete(`/vehicles/${id}`),
   };
};
