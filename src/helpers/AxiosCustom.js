import axios from 'axios';

const {REACT_APP_URL} = process.env;

const AxiosCostum = token => {
   const headers = {};
   if (token) {
      headers['Authorization'] = `Bearer ${token}`;
   }

   return axios.create({
      baseURL: 'http://192.168.1.2:5000',
      headers,
   });
};

export default AxiosCostum;
