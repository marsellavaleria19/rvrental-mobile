import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconChevron from 'react-native-vector-icons/FontAwesome';
import stylePrimary from '../assets/styles/stylePrimary';

const ListMenu = ({title, children}) => {
   return (
      <View style={addStyles.listMenu}>
         <Text style={addStyles.text}>{title}</Text>
         <IconChevron name="chevron-right" style={addStyles.iconChevron} />
      </View>
   );
};

const addStyles = StyleSheet.create({
   flexRow: {
      flexDirection: 'row',
   },
   listMenu: {
      height: 50,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: '#DADADA',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
export default ListMenu;
