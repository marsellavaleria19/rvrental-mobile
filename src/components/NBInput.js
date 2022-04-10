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
}) => {
   return (
      <Box>
         <FormControl isInvalid>
            <Input
               placeholder={placeholder}
               variant={classVariant}
               value={value}
               onChangeText={change}
               secureTextEntry={secure}
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
