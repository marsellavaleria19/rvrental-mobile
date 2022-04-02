const dataLogin = {
   token: null,
   message: null,
   user: null,
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
      case 'VERIFY_USER_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'VERIFY_USER_FULFILLED': {
         const {data} = action.payload;
         console.log(data);
         state.message = data.message;
         state.isLoading = false;
         state.isError = false;
         state.isVerify = true;
         state.isRegister = false;
         return {...state};
      }
      case 'VERIFY_USER_REJECTED': {
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
         state.isLoading = false;
         state.user = data.results;
         return {...state};
      }
      case 'LOGOUT': {
         state.token = null;
         window.localStorage.removeItem('token');
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
