const dataCounter = {
   num: 0,
};

const counter = (state = dataCounter, action) => {
   switch (action.type) {
      case 'COUNTER_INCREMENT': {
         state.num = state.num + 1;
         return {...state};
      }
      case 'COUNTER_DECREMENT': {
         if (state.num > 0) {
            state.num = state.num - 1;
            return {...state};
         }
      }
      default: {
         return {...state};
      }
   }
};

export default counter;
