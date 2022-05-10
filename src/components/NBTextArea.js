import React from 'react';
import {FormControl, TextArea, WarningOutlineIcon} from 'native-base';

const NBTextArea = ({
   isInvalid,
   message,
   change,
   placeholder,
   value,
   label,
}) => {
   return (
      <FormControl
         isInvalid={
            isInvalid
            // Object.keys(errValidation).length > 0 && errValidation.address
         }>
         <FormControl.Label variant="profile">{label}</FormControl.Label>
         <TextArea
            h={20}
            placeholder={placeholder}
            variant="profile"
            value={value}
            onChangeText={change}
         />
         {isInvalid == true && (
            <FormControl.ErrorMessage
               leftIcon={<WarningOutlineIcon size="xs" />}>
               {message}
            </FormControl.ErrorMessage>
         )}
      </FormControl>
   );
};

export default NBTextArea;
