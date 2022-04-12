const dataLogin = {
   token: null,
   message: null,
   user: {
      // id: 43,
      // fullName: 'Admin',
      // NickName: null,
      // gender: 'Female',
      // photo: 'http://192.168.1.2:5000/uploads/rn_image_picker_lib_temp_5dfbd7db-1161-459a-85f2-fd1cc23e08c0.jpg',
      // address: 'Jl.ABC no 113',
      // birthDate: '2022-04-07T17:00:00.000Z',
      // mobileNumber: '12344321',
      // email: 'admin@mail.com',
      // role: 'admin',
   },
   isError: false,
   isLoading: false,
   isAuthenticated: false,
   isVerify: false,
   isRegister: false,
   isSubmitEmail: false,
   errMessage: null,
};

const auth = (state = dataLogin, action) => {
   switch (action.type) {
      case 'LOGIN_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'LOGIN_FULFILLED': {
         const {data} = action.payload;
         state.token = data.results.token;
         state.isLoading = false;
         state.isError = false;
         state.isAuthenticated = true;
         return {...state};
      }
      case 'LOGIN_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'REGISTER_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'REGISTER_FULFILLED': {
         const {data} = action.payload;
         console.log('data' + data);
         state.message = data.message;
         state.isLoading = false;
         state.isError = false;
         state.isRegister = true;
         return {...state};
      }
      case 'REGISTER_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'VERIFY_EMAIL_USER_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'VERIFY_EMAIL_USER_FULFILLED': {
         const {data} = action.payload;
         console.log(data);
         state.message = data.message;
         state.isLoading = false;
         state.isError = false;
         state.isVerify = true;
         state.isRegister = false;
         return {...state};
      }
      case 'VERIFY_EMAIL_USER_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'CONFIRM_VERIFY_USER_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'CONFIRM_VERIFY_USER_FULFILLED': {
         const {data} = action.payload;
         console.log(data);
         state.message = data.message;
         state.user = data.results;
         state.isLoading = false;
         state.isError = false;
         state.isVerify = true;
         state.isRegister = false;
         return {...state};
      }
      case 'CONFIRM_VERIFY_USER_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'FORGOT_PASSWORD_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'FORGOT_PASSWORD_FULFILLED': {
         const {data} = action.payload;
         state.message = data.message;
         state.isLoading = false;
         state.isError = false;
         state.isSubmitEmail = true;
         return {...state};
      }
      case 'FORGOT_PASSWORD_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'CONFIRM_FORGOT_PASSWORD_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'CONFIRM_FORGOT_PASSWORD_FULFILLED': {
         const {data} = action.payload;
         state.message = data.message;
         state.isLoading = false;
         state.isError = false;
         state.isVerify = true;
         return {...state};
      }
      case 'CONFIRM_FORGOT_PASSWORD_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'LOGIN_PROFILE_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'LOGIN_PROFILE_FULFILLED': {
         const {data} = action.payload;
         console.log(data);
         state.isLoading = false;
         state.user = data.results;
         return {...state};
      }
      case 'LOGIN_PROFILE_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'UPDATE_PROFILE_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'UPDATE_PROFILE_FULFILLED': {
         console.log('Hai!');
         console.log(action.payload);
         const {data} = action.payload;
         console.log(data);
         state.isLoading = false;
         state.user = JSON.parse(data).results;
         return {...state};
      }
      case 'UPDATE_PROFILE_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'LOGOUT': {
         state.token = null;
         state.isAuthenticated = false;
         state.isVerify = false;
         return {...state};
      }
      case 'CLEAR_AUTH': {
         return dataLogin;
      }
      default: {
         return {...state};
      }
   }
};

export default auth;
