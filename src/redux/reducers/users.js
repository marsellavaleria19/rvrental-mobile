const dataUser = {
   message: null,
   user: null,
   isError: false,
   isLoading: false,
   errMessage: null,
};

const auth = (state = dataUser, action) => {
   switch (action.type) {
      case 'USER_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'USER_FULFILLED': {
         const {data} = action.payload;
         state.isLoading = false;
         state.user = data.results;
         return {...state};
      }
      case 'USER_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'CLEAR_USER': {
         return dataUser;
      }
      default: {
         return {...state};
      }
   }
};

export default auth;
