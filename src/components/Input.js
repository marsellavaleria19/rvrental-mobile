import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import AntDesigns from 'react-native-vector-icons/AntDesign';

const Input = ({
   placeholder,
   classInput,
   value,
   secure,
   change,
   valueDefault,
   placeholderTextColor,
   children,
   error = null,
   keyboardType,
}) => {
   return (
      <>
         <TextInput
            style={classInput}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            defaultValue={valueDefault}
            value={value}
            onChangeText={change}
            secureTextEntry={secure}
            keyboardType={keyboardType}
         />
         {error !== null && (
            <View style={addStyles.layoutError}>
               <AntDesigns
                  name="exclamationcircleo"
                  style={addStyles.warningIcon}
               />
               <Text style={addStyles.textError}>{error}</Text>
            </View>
         )}
      </>
   );
};

const addStyles = StyleSheet.create({
   layoutError: {
      flexDirection: 'row',
      alignItems: 'center',
      color: 'red',
   },
   textError: {
      fontSize: 12,
      color: 'red',
      marginLeft: 3,
   },
   warningIcon: {
      fontSize: 14,
      color: '#f87171',
   },
});

export {addStyles};
export default Input;
