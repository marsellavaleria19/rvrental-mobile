import React from 'react';
import {Box, FormControl, Input, WarningOutlineIcon} from 'native-base';

const NBInput = ({classInput, placeholder, errorMessage, children}) => {
   return (
      <Box>
         <FormControl>
            <Input placeholder={placeholder} mt="4" />
            {/* <FormControl.ErrorMessage
               leftIcon={<WarningOutlineIcon size="xs" />}>
               {errorMessage}
            </FormControl.ErrorMessage> */}
         </FormControl>
      </Box>
   );
};

export default NBInput;
