import * as React from 'react';
import {Text, View, Button, StyleSheet, TextInput} from 'react-native';
import {styles} from '../assets/styles/styles';
import {stylePrimary} from '../assets/styles/stylePrimary';

const CButton = ({classButton, textButton, children}) => {
   return (
      <View style={classButton}>
         <Text style={textButton}>{children}</Text>
      </View>
   );
};

export default CButton;
