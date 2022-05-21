const statePayment = {
   listPaymentType: [],
   dataPayment: null,
   isLoading: false,
   errMessage: null,
   isError: false,
};

const payment = (state = statePayment, action) => {
   switch (action.type) {
      case 'PAYMENT_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'PAYMENT_FULFILLED': {
         const {data} = action.payload;
         state.dataPayment = data.results;
         state.isLoading = false;
         state.isError = false;
         return {...state};
      }
      case 'SAVE_PAYMENT': {
         state.dataPayment = action.payload;
         return {...state};
      }
      case 'PAYMENT_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'PAYMENT_TYPE_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'PAYMENT_TYPE_FULFILLED': {
         const {data} = action.payload;
         state.listPaymentType = data.result;
         state.isLoading = false;
         state.isError = false;
         return {...state};
      }
      case 'PAYMENT_TYPE_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      default: {
         return {...state};
      }
   }
};

export default payment;
