const dataSearch = {
   listSearch: [],
   pageInfo: {},
   isLoading: false,
   error: false,
   errMessage: null,
};

const search = (state = dataSearch, action) => {
   switch (action.type) {
      case 'SEARCH_FILTER_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'SEARCH_FILTER_FULFILLED': {
         const {data} = action.payload;
         state.listSearch = data.results;
         state.pageInfo = data.pageInfo;
         state.isLoading = false;
         return {...state};
      }
      case 'SEARCH_FILTER_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'SEARCH_FILTER_NEXT_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'SEARCH_FILTER_NEXT_FULFILLED': {
         const {data} = action.payload;
         state.listSearch = [...state.listSearch, ...data.results];
         state.pageInfo = data.pageInfo;
         state.isLoading = false;
         return {...state};
      }
      case 'SEARXH_FILTER_NEXT_REJECTED': {
         state.isLoading = false;
         state.isError = true;
         return {...state};
      }
      default: {
         return {...state};
      }
   }
};

export default search;
