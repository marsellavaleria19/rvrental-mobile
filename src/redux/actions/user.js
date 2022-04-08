import AxiosCostum from '../../helpers/AxiosCustom';
import RNFetchBlob from 'rn-fetch-blob';

export const uploadImageUser = (token, image, id) => {
   return {
      type: 'LOGIN_PROFILE',
      payload: RNFetchBlob.fetch(
         'PATCH',
         `http://192.168.1.2:5000/users/${id}`,
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
      dataUpdate.push({name: `${key}`, data: dataSend[key]});
   });

   const result = RNFetchBlob.fetch(
      'PATCH',
      `http://192.168.1.2:5000/users/${id}`,
      {
         'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${token}`,
      },
      dataUpdate,
   );

   return {
      type: 'UPDATE_PROFILE',
      payload: result,

      // RNFetchBlob.fetch(
      //    'PATCH',
      //    `http://192.168.1.2:5000/users/${id}`,
      //    {
      //       'Content-Type': 'multipart/form-data',
      //       Authorization: `Bearer ${token}`,
      //    },
      //    dataUpdate,
      // ),
   };
};
