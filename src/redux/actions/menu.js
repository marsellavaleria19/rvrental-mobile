export const getListMenu = (isVerified, listMenu) => {
   if (isVerified == 0) {
      const result = listMenu.filter(item => item.id == 6);
      if (result.length == 0) {
         listMenu.push({
            id: 6,
            title: 'Verified Email',
            navigate: 'VerifyUserEmail',
         });
      }
   }
   return {
      type: 'LIST_MENU',
      payload: listMenu,
   };
};
