import AxiosCostum from '../../helpers/AxiosCustom';

export const updateUser = (token, id, name) => {
   console.log('Hallo update user!');
   console.log(data);
   const data = new FormData();
   data.append('fullName', name);
   // console.log(params);
   return {
      type: 'LOGIN_PROFILE',
      payload: AxiosCostum(token).patch(`/users/${id}`, data),
   };
};
