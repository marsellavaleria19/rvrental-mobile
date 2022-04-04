export const reservationProcess = (idVehicle, qty, day, date) => {
   var rentStartDate = new Date(date);
   var rentEndDate = null;
   var tempDay = 0;
   if (day == 1) {
      rentEndDate = rentStartDate;
   } else {
      day = day - 1;
      tempDay = rentStartDate.getDate() + day;
      rentEndDate = new Date(new Date().setDate(tempDay));
   }
   const data = {idVehicle, qty, rentStartDate, rentEndDate, day};
   console.log(data);
   return {
      type: 'RESERVATION',
      payload: data,
   };
};
