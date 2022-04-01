import React from 'react';
import {Box, Button} from 'native-base';

const NBButton = ({press, children}) => {
   return (
      <Box>
         <Button onPress={press}>{children}</Button>
      </Box>
   );
};

export default NBButton;
