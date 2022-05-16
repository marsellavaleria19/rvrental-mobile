export const reservationProcess = (vehicle, dataReservation) => {
   var rentStartDate = new Date(dataReservation.date);
   var rentEndDate = null;
   var tempDay = 0;
   if (parseInt(dataReservation.day) == 1) {
      rentEndDate = rentStartDate;
   } else {
      const dayTemp = parseInt(dataReservation.day) - 1;
      tempDay = rentStartDate.getDate() + dayTemp;
      rentEndDate = new Date(new Date().setDate(tempDay));
   }

   const total =
      parseInt(dataReservation.qty) *
      vehicle.price *
      parseInt(dataReservation.day);

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
