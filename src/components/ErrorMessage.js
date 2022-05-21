import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import stylePrimary from '../assets/styles/stylePrimary';

const ErrorMessage = ({error = null}) => {
   return (
      <View style={addStyles.layoutError}>
         <MaterialCommunityIcons
            name="alert-circle-outline"
            style={addStyles.warningIcon}
         />
         <Text style={addStyles.textError}>{error}</Text>
      </View>
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
      fontSize: 18,
      color: '#f87171',
      alignItems: 'center',
      fontWeight: '900',
      marginTop: 2,
   },
});

export {addStyles};
export default ErrorMessage;
