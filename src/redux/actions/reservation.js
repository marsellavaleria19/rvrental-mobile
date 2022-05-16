export const reservationProcess = (vehicle, dataReservation) => {
   var rentStartDate = new Date(dataReservation.date);
   var rentEndDate = null;
   var tempDay = 0;
   if (dataReservation.day == 1) {
      rentEndDate = rentStartDate;
   } else {
      const dayTemp = dataReservation.day - 1;
      tempDay = rentStartDate.getDate() + dayTemp;
      rentEndDate = new Date(new Date().setDate(tempDay));
   }

   const total = dataReservation.qty * vehicle.price * dataReservation.day;

   const data = {
      idVehicle: vehicle.id,
      brand: vehicle.name,
      photo: vehicle.photo,
      qty: dataReservation.qty,
      rentStartDate,
      rentEndDate,
      day: dataReservation.day,
      totalPayment: total,
   };
   console.log(data);
   return {
      type: 'RESERVATION',
      payload: data,
   };
};
