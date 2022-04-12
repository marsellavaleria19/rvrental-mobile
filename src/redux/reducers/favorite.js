const dataFavorite = {
   num: 0,
   listFavorite: [],
};

const favorite = (state = dataFavorite, action) => {
   switch (action.type) {
      case 'GET_FAVORITE': {
         state.listFavorie = [...state.listFavorite];
         return {...state};
      }
      case 'ADD_FAVORITE': {
         state.listFavorite.push(action.payload);
         return {...state};
      }
      case 'DELETE_FAVORITE': {
         const data = action.payload;
         state.listFavorite = state.listFavorite.filter(
            item => item.id !== data.id,
         );
         return {...state};
      }
      default: {
         return {...state};
      }
   }
};

export default favorite;
