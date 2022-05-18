import React from 'react';
import {
   Box,
   Select,
   CheckIcon,
   FormControl,
   WarningOutlineIcon,
} from 'native-base';
import {StyleSheet} from 'react-native';
import stylePrimary from '../assets/styles/stylePrimary';

const BSelect = ({
   width,
   placeholder,
   selected,
   change,
   variantSelect,
   children,
   isInvalid,
   errMessage,
}) => {
   return (
      <Box w={width}>
         <FormControl isInvalid={isInvalid}>
            <Select
               selectedValue={selected}
               minWidth="20"
               placeholder={placeholder}
               // _selectedItem={{
               //    endIcon: <CheckIcon size="5" />,
               //    variant: {variantSelect},
               // }}
               variant={variantSelect}
               bg="teal.600"
               onValueChange={change}
               _actionSheetContent={{bg: stylePrimary.background}}>
               {children}
            </Select>
            {errMessage !== null && (
               <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errMessage}
               </FormControl.ErrorMessage>
            )}
         </FormControl>
      </Box>
      // <NativeBaseProvider extendTheme>
      //    <Select
      //       minWidth="200"
      //       accessibilityLabel="Choose Service"
      //       placeholder={placeholder}
      //       _selectedItem={{
      //          bg: 'white',
      //          endIcon: <CheckIcon size={5} />,
      //       }}
      //       color="white"
      //       backgroundColor="gray.400">
      //       <Select.Item label="UX Research" value="ux" />
      //       <Select.Item label="Web Development" value="web" />
      //       <Select.Item label="Cross Platform Development" value="cross" />
      //       <Select.Item label="UI Designing" value="ui" />
      //       <Select.Item label="Backend Development" value="backend" />
      //    </Select>
      // </NativeBaseProvider>
   );
};

const addStyles = StyleSheet.create({
   backgroud: {
      backgroundColor: 'black',
   },
});

export {addStyles};
export default BSelect;
