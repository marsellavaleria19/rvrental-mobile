import {default as axios} from 'axios';
import AxiosCustom from '../../helpers/AxiosCustom';
import RNFetchBlob from 'rn-fetch-blob';
import {API_URL} from '@env';

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

export const getDataVehicle = () => {
   return {
      type: 'GET_DATA_VEHICLE',
   };
};

export const saveDetailVehicle = item => {
   return {
      type: 'SAVE_DETAIL_VEHICLE',
      payload: item,
   };
};

const rnFetchBlobHandle = async (token, dataVehicle, id = null) => {
   var result = null;
   if (id !== null) {
      result = await RNFetchBlob.fetch(
         'PATCH',
         `${API_URL}/vehicles/${id}`,
         {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
         },
         dataVehicle,
      );
   } else {
      result = await RNFetchBlob.fetch(
         'POST',
         `${API_URL}/vehicles`,
         {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
         },
         dataVehicle,
      );
   }
   console.log(result);
   const dataJSON = JSON.parse(result.data);
   console.log(dataJSON);
   if (dataJSON.success == false) {
      return Promise.reject({data: dataJSON});
   } else {
      return {data: dataJSON};
   }
};
export const addDataVehicle = (token, dataSend, image = null) => {
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
      if (key) {
         dataVehicle.push({name: `${key}`, data: dataSend[key]});
      }
   });

   return {
      type: 'GET_RESULT_VEHICLE',
      payload: rnFetchBlobHandle(token, dataVehicle),
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
      payload: rnFetchBlobHandle(token, dataVehicle, id),
   };
};

export const deleteDataVehicle = (token, id) => {
   return {
      type: 'DELETE_VEHICLE',
      payload: AxiosCustom(token).delete(`/vehicles/${id}`),
   };
};

export const getNextListVehicle = url => {
   return {
      type: 'VEHICLE_NEXT',
      payload: AxiosCustom().get(url),
   };
};
