import React from 'react';
import {Text, StyleSheet} from 'react-native';
import stylePrimary from '../assets/styles/stylePrimary';

const Clock = ({hour, minutes, second}) => {
   return (
      <Text style={addStyles.time}>
         {hour}:{minutes}:{second}{' '}
      </Text>
   );
};

const addStyles = StyleSheet.create({
   time: {
      color: '#9B0A0A',
      fontSize: 24,
      fontWeight: stylePrimary.bold,
      marginTop: 9,
   },
});

export {addStyles};

export default Clock;
