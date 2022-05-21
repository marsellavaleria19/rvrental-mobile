import React from 'react';
import {FormControl, TextArea, WarningOutlineIcon} from 'native-base';

const NBTextArea = ({
   valid,
   message = null,
   change,
   placeholder,
   value,
   label,
   variant,
}) => {
   return (
      <FormControl
         isInvalid={
            valid
            // Object.keys(errValidation).length > 0 && errValidation.address
         }>
         <FormControl.Label variant="profile">{label}</FormControl.Label>
         <TextArea
            h={20}
            placeholder={placeholder}
            variant={variant}
            value={value}
            onChangeText={change}
         />
         {message !== null && (
            <FormControl.ErrorMessage
               leftIcon={<WarningOutlineIcon size="xs" />}>
               {message}
            </FormControl.ErrorMessage>
         )}
      </FormControl>
   );
};

export default NBTextArea;
