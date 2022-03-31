import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {styles} from '../assets/styles/styles';
import stylePrimary from '../assets/styles/stylePrimary';
// import {image} from '../assets/images/backgroud-image.png'

const MainBarTitle = ({title, link, children}) => {
   return (
      <View style={addStyles.mainBarTitle}>
         <Text style={addStyles.titleCategory}>{title}</Text>
         <Text style={addStyles.link}>View More</Text>
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
