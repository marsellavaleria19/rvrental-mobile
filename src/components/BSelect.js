import React from 'react';
import {
   Box,
   Select,
   CheckIcon,
   NativeBaseProvider,
   FormControl,
   WarningOutlineIcon,
   extendTheme,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {color} from 'native-base/lib/typescript/theme/styled-system';

const BSelect = ({classInput, placeholder, option, children}) => {
   let [service, setService] = React.useState('');
   // const theme = extendTheme({
   //    components: {
   //       Select: {
   //          variants: {
   //             rounded: ({colorScheme}) => {
   //                return {
   //                   bg: `${colorScheme}.500`,
   //                   rounded: 'full',
   //                };
   //             },
   //          },
   //       },
   //    },
   // });
   return (
      <NativeBaseProvider>
         <Select
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder={placeholder}
            _selectedItem={{
               bg: 'white',
               endIcon: <CheckIcon size={5} />,
            }}
            color="white"
            backgroundColor="gray.400">
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
         </Select>
         {/* <FormControl.ErrorMessage
               leftIcon={<WarningOutlineIcon size="xs" />}>
               Please make a selection!
            </FormControl.ErrorMessage> */}
      </NativeBaseProvider>
   );
};

const addStyles = StyleSheet.create({
   backgroud: {
      backgroundColor: 'black',
   },
});

export {addStyles};
export default BSelect;
