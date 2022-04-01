import React from 'react';
import {Box, FormControl, Input, WarningOutlineIcon} from 'native-base';

const BInput = ({classInput, placeholder, errorMessage, children}) => {
   return (
      <Box>
         <FormControl>
            <Input placeholder={placeholder} />
            {/* <FormControl.ErrorMessage
               leftIcon={<WarningOutlineIcon size="xs" />}>
               {errorMessage}
            </FormControl.ErrorMessage> */}
         </FormControl>
      </Box>
   );
};

export default BInput;
