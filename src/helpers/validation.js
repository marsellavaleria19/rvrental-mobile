import validator from 'validator';

export const validation = (data, requirement) => {
   var result = {};
   var validate = null;
   for (var key in data) {
      if (requirement[key]) {
         if (requirement[key].toString().includes('|')) {
            var split = requirement[key].split('|');
            for (let index = 0; index < split.length; index++) {
               validate = validateRequirement(split[index], data[key], key);
               result = {...result, ...validate};
            }
         } else {
            validate = validateRequirement(requirement[key], data[key], key);
            result = {...result, ...validate};
         }
      }
   }

   return result;
};

const validateRequirement = (type, data, key) => {
   var result = {};
   if (type == 'required') {
      if (validator.isEmpty(data)) {
         result[key] = `${key} must be filled`;
      }
   }
   if (type == 'choose') {
      if (validator.isEmpty(data)) {
         result[key] = `${key} must be choose`;
      }
   }
   if (!validator.isEmpty(data)) {
      if (type == 'number') {
         if (!validator.isNumeric(data)) {
            result[key] = `${key} must be a number`;
         }
      }
      if (type == 'date') {
         if (!validator.isDate(data)) {
            result[key] = `${key} must be a format date`;
         }
      }
      if (type == 'phone') {
         if (!validator.isMobilePhone(data)) {
            result[key] = `${key} must be a phone number's format`;
         }
      }
      if (type == 'email') {
         if (!validator.isEmail(data)) {
            result[key] = `${key} must be a email's format`;
         }
      }
      if (type == 'grather0') {
         if (validator.isNumeric(data)) {
            if (parseInt(data) <= 0) {
               result[key] = `${key} must be a grather than 0`;
            }
         }
      }
   }
   return result;
};
