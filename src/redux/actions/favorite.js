export const addFavorite = item => {
   return {
      type: 'ADD_FAVORITE',
      payload: item,
   };
};

export const deleteFavorite = item => {
   return {
      type: 'DELETE_FAVORITE',
      payload: item,
   };
};

export const getListFavorite = () => {
   return {
      type: 'GET_FAVORITE',
   };
};
