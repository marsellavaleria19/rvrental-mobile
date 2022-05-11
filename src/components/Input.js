import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

const Input = ({
   placeholder,
   classInput,
   value,
   secure,
   change,
   valueDefault,
   children,
   keyboardType,
}) => {
   return (
      <TextInput
         style={classInput}
         placeholder={placeholder}
         placeholderTextColor="white"
         defaultValue={valueDefault}
         value={value}
         onChangeText={change}
         secureTextEntry={secure}
         keyboardType={keyboardType}
      />
   );
};

export default Input;
