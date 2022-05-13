import React from 'react';
import {
   Box,
   FormControl,
   Input,
   variant,
   WarningOutlineIcon,
} from 'native-base';

const NBInput = ({
   classInput,
   placeholder,
   classVariant,
   value,
   change,
   secure,
   errorMessage,
   isValidate,
   children,
   size,
}) => {
   return (
      <Box>
         <FormControl isInvalid={isValidate}>
            <Input
               placeholder={placeholder}
               variant={classVariant}
               value={value}
               onChangeText={change}
               secureTextEntry={secure}
               size={size}
            />
            {isValidate && (
               <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errorMessage}
               </FormControl.ErrorMessage>
            )}
         </FormControl>
      </Box>
   );
};

export default NBInput;
