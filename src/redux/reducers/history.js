const dataHistory = {
   listHistory: [],
   dataHistory: null,
   isError: false,
   isLoading: false,
   errMessage: null,
   message: null,
   isSuccessPayment: false,
   pageInfo: null,
};

const history = (state = dataHistory, action) => {
   switch (action.type) {
      case 'HISTORY_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'HISTORY_FULFILLED': {
         const {data} = action.payload;
         state.listHistory = data.result;
         state.pageInfo = data.pageInfo;
         state.isLoading = false;
         state.isError = false;
         return {...state};
      }
      case 'CLEAR_HISTORY': {
         return dataHistory;
      }
      case 'HISTORY_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'HISTORY_NEXT_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'HISTORY_NEXT_FULFILLED': {
         const {data} = action.payload;
         state.listHistory = [...state.listHistory, ...data.result];
         state.pageInfo = data.pageInfo;
         state.isLoading = false;
         return {...state};
      }
      case 'HISTORY_NEXT_REJECTED': {
         state.isLoading = false;
         state.isError = true;
         return {...state};
      }
      case 'HISTORY_DETAIL_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'HISTORY_DETAIL_FULFILLED': {
         const {data} = action.payload;
         state.dataHistory = data.result;
         state.isLoading = false;
         state.isError = false;
         state.message = data.message;
         return {...state};
      }
      case 'HISTORY_DETAIL_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'HISTORY_DELETE_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'HISTORY_DELETE_FULFILLED': {
         const {data} = action.payload[0];
         // console.log(action.payload);
         state.isLoading = false;
         state.isError = false;
         state.message = data.message;
         return {...state};
      }
      case 'HISTORY_DELETE_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'CLEAR_HISTORY': {
         return dataHistory;
      }
      case 'HISTORY_SET_SUCCESS': {
         state.isSuccessPayment = true;
      }
      default: {
         return {...state};
      }
   }
};

export default history;
