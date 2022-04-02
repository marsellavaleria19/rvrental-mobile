import React from 'react';
import {Alert, HStack, VStack, Text} from 'native-base';

export const NBAlert = ({message, color, status}) => {
   return (
      <Alert w="100%" colorScheme={color} status={status}>
         <VStack space={2} flexShrink={1} w="100%">
            <HStack
               flexShrink={1}
               space={2}
               alignItems="center"
               justifyContent="space-between">
               <HStack space={2} flexShrink={1} alignItems="center">
                  <Alert.Icon />
                  <Text color="subtle">{message}</Text>
               </HStack>
            </HStack>
         </VStack>
      </Alert>
   );
};
