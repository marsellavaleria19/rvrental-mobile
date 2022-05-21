import AxiosCostum from '../../helpers/AxiosCustom';
import RNFetchBlob from 'rn-fetch-blob';
import {API_URL} from '@env';

export const uploadImageUser = (token, image, id) => {
   return {
      type: 'LOGIN_PROFILE',
      payload: RNFetchBlob.fetch(
         'PATCH',
         `${API_URL}/users/${id}`,
         {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
         },
         [
            {
               name: 'photo',
               filename: image.assets[0].fileName,
               type: image.assets[0].type,
               data: RNFetchBlob.wrap(image.assets[0].uri),
            },
         ],
      ),
   };
};

export const updateUser = (token, id, dataSend, image = null) => {
   var dataUpdate = [];
   if (image !== null) {
      dataUpdate.push({
         name: 'photo',
         filename: image.fileName,
         type: image.type,
         data: RNFetchBlob.wrap(image.uri),
      });
   }

   Object.keys(dataSend).forEach(key => {
      if (key) {
         dataUpdate.push({name: `${key}`, data: dataSend[key]});
      }
   });

   return {
      type: 'UPDATE_PROFILE',
      payload: RNFetchBlob.fetch(
         'PATCH',
         `${API_URL}/users/${id}`,
         {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
         },
         dataUpdate,
      ),
   };
};
