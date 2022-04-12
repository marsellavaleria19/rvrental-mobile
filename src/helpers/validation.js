export const validation = (data, requirement) => {
   var result = {};
   Object.keys(requirement).forEach(key => {
      if (requirement[key] == 'required') {
         if (data[key] == null || data[key] == '') {
            result[key] = `${key} must be filled`;
         }
      }
      if (requirement[key].toString().includes('|')) {
         var split = requirement[key].split('|');
         console.log(split);
         split.forEach(item => {
            if (item == 'required') {
               if (data[key] == null || data[key] == '') {
                  result[key] = `${key} must be filled`;
               }
            }
            if (item == 'number') {
               if (isNaN(data[key])) {
                  result[key] = `${key} must be a number`;
               }
            }
            if (item == 'phone') {
               if (isNaN(data[key])) {
                  if (data[key].length < 10 && data[key] > 12) {
                     result[key] = `${key} must be a 10 -12 character`;
                  }
               }
            }
         });
      }
   });
   console.log(result);
   return result;
};
