import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from '../assets/styles/styles';
import stylePrimary from '../assets/styles/stylePrimary';
// import {image} from '../assets/images/backgroud-image.png'

const MainBarTitle = ({title, link, children, navigate}) => {
   return (
      <View style={addStyles.mainBarTitle}>
         <Text style={addStyles.titleCategory}>{title}</Text>
         <TouchableOpacity onPress={navigate}>
            <Text style={addStyles.link}>View More</Text>
         </TouchableOpacity>
      </View>
   );
};

const addStyles = StyleSheet.create({
   mainBarTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: 20,
      alignItems: 'center',
   },
   titleCategory: {
      fontSize: 22,
      color: stylePrimary.mainColor,
      fontWeight: '700',
   },
   link: {
      color: stylePrimary.mainColor,
      fontWeight: '700',
   },
});
export default MainBarTitle;
