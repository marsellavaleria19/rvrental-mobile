import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import stylePrimary from '../assets/styles/stylePrimary';

const ListMenuFilter = ({title, press, button, value, children}) => {
   return (
      <TouchableOpacity onPress={press}>
         <View style={addStyles.listMenu}>
            <Text style={addStyles.text}>{title}</Text>
            <Text style={addStyles.text}>{value}</Text>
            {button}
         </View>
      </TouchableOpacity>
   );
};

const addStyles = StyleSheet.create({
   flexRow: {
      flexDirection: 'row',
   },
   listMenu: {
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 5,
   },
   text: {
      fontSize: 18,
      color: stylePrimary.mainColor,
      fontWeight: '600',
   },
   iconChevron: {
      fontSize: 14,
      color: '#999999',
   },
});

export {addStyles};
export default ListMenuFilter;
