const dataVehicle = {
   listVehicle: [],
   listAllVehicle: [],
   pageInfo: {},
   isLoading: false,
   error: false,
   errMessage: null,
   message: null,
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
         state.listVehicle = data.result;
         state.listAllVehicle = [...state.listAllVehicle, ...data.result];
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
         // var dataJson = JSON.parse(data);
         state.dataVehicle = data.result;
         state.message = dataJson.message;
         state.isLoading = false;
         return {...state};
      }
      case 'GET_DETAIL_VEHICLE_REJECTED': {
         state.isLoading = false;
         const {data} = action.payload;
         state.isError = true;
         var dataJson = JSON.parse(data);
         state.errMessage = dataJson.message;
         return {...state};
      }
      case 'SAVE_DETAIL_VEHICLE': {
         state.dataVehicle = action.payload;
         state.isLoading = false;
         return {...state};
      }
      case 'GET_RESULT_VEHICLE_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'GET_RESULT_VEHICLE_FULFILLED': {
         const {data} = action.payload;
         state.dataVehicle = data.result;
         state.message = data.message;
         state.isLoading = false;
         state.isError = false;
         return {...state};
      }
      case 'GET_RESULT_VEHICLE_REJECTED': {
         console.log(action.payload);
         const {data} = action.payload;
         state.isLoading = false;
         state.isError = true;
         state.errMessage = data.message;
         return {...state};
      }
      case 'DELETE_VEHICLE_PENDING': {
         state.isLoading = true;
         return {...state};
      }
      case 'DELETE_VEHICLE_FULFILLED': {
         const {data} = action.payload;
         state.message = data.message;
         state.isLoading = false;
         state.isError = false;
         return {...state};
      }
      case 'DELETE_VEHICLE_REJECTED': {
         const {data} = action.payload.response;
         state.isLoading = true;
         state.isError = true;
         state.errMessage = data.message;
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
      case 'CLEAR_VEHICLE': {
         return dataVehicle;
      }
      default: {
         return {...state};
      }
   }
};

export default vehicle;
