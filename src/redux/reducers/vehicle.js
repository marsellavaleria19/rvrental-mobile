const dataVehicle = {
   listVehicle: [],
   pageInfo: {},
   isLoading: false,
   error: false,
   dataVehicle: null,
};

const vehicle = (state = dataVehicle, action) => {
   switch (action.type) {
      case 'GET_VEHICLE_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'GET_VEHICLE_FULFILLED': {
         const {data} = action.payload;
         state.listVehicle = data.results;
         state.pageInfo = data.pageInfo;
         state.isLoading = false;
         return {...state};
      }
      case 'GET_VEHICLE_REJECTED': {
         state.isLoading = false;
         state.isError = true;
         return {...state};
      }
      case 'GET_DETAIL_VEHICLE_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'GET_DETAIL_VEHICLE_FULFILLED': {
         const {data} = action.payload;
         state.dataVehicle = data.results;
         state.isLoading = false;
         return {...state};
      }
      case 'GET_DETAIL_VEHICLE_REJECTED': {
         state.isLoading = true;
         return {...state};
      }
      case 'GET_RESULT_VEHICLE_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'GET_RESULT_VEHICLE_FULFILLED': {
         const {data} = action.payload;
         const parse = JSON.parse(data);
         state.dataVehicle = parse.results;
         state.message = parse.message;
         state.isLoading = false;
         return {...state};
      }
      case 'GET_RESULT_VEHICLE_REJECTED': {
         state.isLoading = true;
         return {...state};
      }
      case 'GET_DELETE_VEHICLE_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'GET_DELETE_VEHICLE_FULFILLED': {
         const {data} = action.payload;
         state.message = data.message;
         state.isLoading = false;
         return {...state};
      }
      case 'GET_DELETE_VEHICLE_REJECTED': {
         state.isLoading = true;
         return {...state};
      }
      case 'GET_VEHICLE_NEXT_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'GET_VEHICLE_NEXT_FULFILLED': {
         const {data} = action.payload;
         state.listVehicle = [...state.listVehicle, ...data.results];
         state.pageInfo = data.pageInfo;
         state.isLoading = false;
         return {...state};
      }
      case 'GET_VEHICLE_NEXT_REJECTED': {
         state.isLoading = false;
         state.isError = true;
         return {...state};
      }

      default: {
         return {...state};
      }
   }
};

export default vehicle;
