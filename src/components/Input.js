import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

const Input = ({
   placeholder,
   classInput,
   value,
   secure,
   change,
   valurDefault,
   children,
}) => {
   return (
      <TextInput
         style={classInput}
         placeholder={placeholder}
         placeholderTextColor="white"
         defaultValue={valurDefault}
         value={value}
         onChangeText={change}
         secureTextEntry={secure}
      />
   );
};

export default Input;
