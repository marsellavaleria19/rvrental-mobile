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
   errorMessage,
   children,
}) => {
   return (
      <Box>
         <FormControl>
            <FormControl.Label variant={classVariant}>
               {label}
            </FormControl.Label>
            <Input placeholder={placeholder} variant={classVariant} />
            {/* <FormControl.ErrorMessage
               leftIcon={<WarningOutlineIcon size="xs" />}>
               {errorMessage}
            </FormControl.ErrorMessage> */}
         </FormControl>
      </Box>
   );
};

export default NBInputLabel;
