import React from 'react';
import {
   Box,
   Select,
   CheckIcon,
   NativeBaseProvider,
   WarningOutlineIcon,
   FormControl,
   extendTheme,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {color} from 'native-base/lib/typescript/theme/styled-system';

const BSelect = ({classInput, placeholder, option, children}) => {
   let [service, setService] = React.useState('');
   return (
      <Box w="3/4" maxW="300">
         <Select
            selectedValue={service}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            _selectedItem={{
               bg: 'teal.600',
               endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
         </Select>
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
