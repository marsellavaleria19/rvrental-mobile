import React from 'react';
import {Actionsheet, Text, Box} from 'native-base';

const NBActionSheet = ({open, close, title, children}) => {
   return (
      <Actionsheet isOpen={open} onClose={close}>
         <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
               <Text
                  fontSize="16"
                  color="gray.500"
                  _dark={{
                     color: 'gray.300',
                  }}>
                  {title}
               </Text>
            </Box>
            {children}
         </Actionsheet.Content>
      </Actionsheet>
   );
};

export default NBActionSheet;
