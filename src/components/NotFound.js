import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IconChevron from 'react-native-vector-icons/FontAwesome';
import stylePrimary from '../assets/styles/stylePrimary';
import logo from '../assets/images/logo-rv.png';
import {Image} from 'react-native';

const NotFound = () => {
   return (
      <View style={addStyles.layout}>
         <View style={addStyles.layoutImage}>
            <Image
               source={logo}
               style={addStyles.imageStyle}
               resizeMode="cover"
            />
         </View>
         <Text style={addStyles.text}>Data Not Found</Text>
      </View>
   );
};

const addStyles = StyleSheet.create({
   layout: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '80%',
   },
   layoutImage: {
      width: '100%',
      marginTop: 50,
   },
   imageStyle: {
      width: '100%',
      height: 150,
   },

   text: {
      fontSize: 24,
      color: stylePrimary.mainColor,
      fontWeight: '900',
      textAlign: 'center',
   },
});

export {addStyles};
export default NotFound;
