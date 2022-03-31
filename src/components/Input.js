import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

const Input = ({placeholder, classInput, value, children}) => {
   return (
      <TextInput
         style={classInput}
         placeholder={placeholder}
         placeholderTextColor="white"
         value={value}
      />
   );
};

export default Input;
