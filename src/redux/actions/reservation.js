export const reservationProcess = (vehicle, qty, day, date) => {
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

   const total = qty * vehicle.price * day;

   const data = {
      idVehicle: vehicle.id,
      brand: vehicle.name,
      photo: vehicle.photo,
      qty,
      rentStartDate,
      rentEndDate,
      day,
      totalPayment: total,
   };
   console.log(data);
   return {
      type: 'RESERVATION',
      payload: data,
   };
};
