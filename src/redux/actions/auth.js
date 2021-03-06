import qs from 'qs';
import AxiosCostum from '../../helpers/AxiosCustom';

export const loginProcess = (email, password) => {
   const data = {email: email, password: password};
   return {
      type: 'LOGIN',
      payload: AxiosCostum().post('/auth/login', qs.stringify(data)),
   };
};

export const getDataUser = token => {
   return {
      type: 'LOGIN_PROFILE',
      payload: AxiosCostum(token).get('/profile'),
   };
};

export const registrationProcess = dataSend => {
   const data = {
      fullName: dataSend.name,
      username: dataSend.username,
      email: dataSend.email,
      password: dataSend.password,
      mobileNumber: dataSend['mobile number'],
   };

   return {
      type: 'REGISTER',
      payload: AxiosCostum().post('/auth/register', qs.stringify(data)),
   };
};

export const verifyEmailProcess = email => {
   const data = {email: email};
   return {
      type: 'VERIFY_EMAIL_USER',
      payload: AxiosCostum().post(
         '/auth/emailverification',
         qs.stringify(data),
      ),
   };
};

export const confirmVerifyProcess = (email, password, code) => {
   const data = {email: email, password: password, code: code};
   return {
      type: 'CONFIRM_VERIFY_USER',
      payload: AxiosCostum().post(
         '/auth/emailverification',
         qs.stringify(data),
      ),
   };
};

export const forgotPasswordProcess = email => {
   const data = {email: email};
   return {
      type: 'FORGOT_PASSWORD',
      payload: AxiosCostum().post('/auth/forgotpassword', qs.stringify(data)),
   };
};

export const confirmForgotPasswordProcess = (
   email,
   code,
   password,
   confirmPassword,
) => {
   const data = {
      email: email,
      code: code,
      password: password,
      confirmPassword: confirmPassword,
   };
   console.log(data);
   return {
      type: 'CONFIRM_FORGOT_PASSWORD',
      payload: AxiosCostum().post('/auth/forgotpassword', qs.stringify(data)),
   };
};

export const changePassword = (token, dataSend) => {
   const data = {
      password: dataSend.currentPassword,
      newPassword: dataSend.newPassword,
      confirmNewPassword: dataSend.confirmNewPassword,
   };
   return {
      type: 'CHANGE_PASSWORD',
      payload: AxiosCostum(token).post(
         '/auth/changepassword',
         qs.stringify(data),
      ),
   };
};
