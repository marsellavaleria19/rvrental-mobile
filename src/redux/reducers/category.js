const dataCategory = {
   listCategory: [],
   pageInfo: {},
   isLoading: false,
   error: false,
   dataCategory: null,
};

const category = (state = dataCategory, action) => {
   switch (action.type) {
      case 'GET_CATEGORY_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'GET_CATEGORY_FULFILLED': {
         const {data} = action.payload;
         state.listCategory = data.results;
         state.pageInfo = data.pageInfo;
         state.isLoading = false;
         return {...state};
      }
      case 'GET_CATEGORY_REJECTED': {
         state.isLoading = false;
         state.isError = true;
         return {...state};
      }
      case 'GET_DETAIL_CATEGORY_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'GET_DETAIL_CATEGORY_FULFILLED': {
         const {data} = action.payload;
         state.dataCategory = data.results;
         state.isLoading = false;
         return {...state};
      }
      case 'GET_DETAIL_CATEGORY_REJECTED': {
         state.isLoading = false;
         state.isError = true;
         return {...state};
      }
      default: {
         return {...state};
      }
   }
};

export default category;
