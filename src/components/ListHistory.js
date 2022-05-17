import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {styles} from '../assets/styles/styles';
import IconStar from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
// import { FontAwesome } from '@expo/vector-icons';
// import {image} from '../assets/images/backgroud-image.png'

const ListHistory = ({
   title,
   path,
   status,
   payment,
   reservationDate,
   marginLeft = 0,
}) => {
   const addStyles = StyleSheet.create({
      layoutHistory: {
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
         marginBottom: 10,
         marginLeft: marginLeft,
      },
      layoutDetail: {
         marginHorizontal: 5,
      },
      titleDetail: {
         fontSize: 12,
         fontWeight: '700',
      },
      descriptionDetail: {
         fontSize: 12,
      },
      statusAvailable: {
         fontSize: 12,
         color: 'green',
      },
      statusNotAvailable: {
         fontSize: 12,
         color: 'red',
      },
      priceDetail: {
         fontSize: 12,
         fontWeight: '700',
      },
      imageCategory: {
         minWidth: 101,
         height: 88,
         borderRadius: 10,
      },
      layoutImage: {
         position: 'relative',
         marginRight: 3,
      },
   });

   return (
      <View style={addStyles.layoutHistory}>
         <View style={addStyles.layoutImage}>
            <Image source={path} style={addStyles.imageCategory} />
         </View>
         <View style={addStyles.layoutDetail}>
            <Text style={addStyles.titleDetail}>{title}</Text>
            <Text style={addStyles.descriptionDetail}>{reservationDate}</Text>
            <Text style={addStyles.priceDetail}>{payment}</Text>
            <Text style={addStyles.statusAvailable}>{status}</Text>
         </View>
      </View>
   );
};

export default ListHistory;
