const dataMenu = {
   listMenu: [],
};

const menu = (state = dataMenu, action) => {
   switch (action.type) {
      case 'LIST_MENU': {
         state.listMenu = action.payload;
         return {...state};
      }
      case 'CLEAR_LIST_MENU': {
         return dataMenu;
      }
      default: {
         return {...state};
      }
   }
};

export default menu;
