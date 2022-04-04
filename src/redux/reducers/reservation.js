const stateReservation = {
   dataReservation: null,
};

const reservation = (state = stateReservation, action) => {
   switch (action.type) {
      case 'RESERVATION': {
         state.dataReservation = action.payload;
         return {...state};
      }
      default: {
         return {...state};
      }
   }
};

export default reservation;
