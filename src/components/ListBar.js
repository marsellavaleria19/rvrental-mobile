import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {styles} from '../assets/styles/styles';
import stylePrimary from '../assets/styles/stylePrimary';
import MainBarTitle from './MainBarTitle';
// import {image} from '../assets/images/backgroud-image.png'

const ListBar = ({title, children, navigate}) => {
   return (
      <View>
         <MainBarTitle title={title} navigate={navigate} />
         <View style={addStyles.layoutList}>{children}</View>
      </View>
   );
};

const addStyles = StyleSheet.create({
   layoutList: {
      flexDirection: 'row',
      marginTop: 10,
   },
});
export default ListBar;
