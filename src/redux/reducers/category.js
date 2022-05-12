const dataCategory = {
   listCategory: [],
   pageInfo: {},
   isLoading: false,
   isError: false,
   dataCategory: null,
   message: null,
   errMessage: null,
};

const category = (state = dataCategory, action) => {
   switch (action.type) {
      case 'GET_CATEGORY_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'GET_CATEGORY_FULFILLED': {
         const {data} = action.payload;
         state.listCategory = data.result;
         state.pageInfo = data.pageInfo;
         state.isLoading = false;
         return {...state};
      }
      case 'GET_CATEGORY_REJECTED': {
         state.isLoading = false;
         state.isError = true;
         return {...state};
      }
      case 'ADD_CATEGORY_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'ADD_CATEGORY_FULFILLED': {
         const {data} = action.payload;
         state.dataCategory = data.result;
         state.message = data.message;
         state.isLoading = false;
         state.isError = false;
         return {...state};
      }
      case 'ADD_CATEGORY_REJECTED': {
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

export default category;
