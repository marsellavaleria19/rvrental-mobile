import React from 'react';
import {
   Box,
   FormControl,
   Input,
   variant,
   WarningOutlineIcon,
} from 'native-base';

const NBInputLabel = ({
   classInput,
   placeholder,
   classVariant,
   label,
   change,
   value,
   isValidate,
   disabled,
   errorMessage,
   children,
}) => {
   return (
      <Box>
         <FormControl isInvalid={isValidate} isDisabled={disabled}>
            <FormControl.Label variant={classVariant}>
               {label}
            </FormControl.Label>
            <Input
               placeholder={placeholder}
               variant={classVariant}
               value={value}
               onChangeText={change}
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

export default NBInputLabel;
