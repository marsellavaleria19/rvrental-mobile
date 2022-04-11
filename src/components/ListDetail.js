import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {styles} from '../assets/styles/styles';
import IconStar from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import stylePrimary from '../assets/styles/stylePrimary';
// import { FontAwesome } from '@expo/vector-icons';
// import {image} from '../assets/images/backgroud-image.png'

const ListDetail = ({
   title,
   path,
   detail,
   status,
   price,
   rate,
   description,
   navigate,
   children,
}) => {
   return (
      <View>
         <TouchableOpacity onPress={navigate}>
            <View style={styles.layoutList}>
               <View style={styles.layoutImageRating}>
                  <Image source={path} style={styles.imageCategory} />
                  <LinearGradient
                     colors={[stylePrimary.secondaryColor, '#7796b6']}
                     style={[styles.rateLayout, {position: 'absolute'}]}>
                     <Text style={styles.rateText}>{rate}</Text>
                     <IconStar name="star" style={styles.rateIcon} />
                  </LinearGradient>
               </View>
               <View style={styles.layoutDetail}>
                  <Text style={styles.titleDetail}>{title}</Text>
                  <Text style={styles.descriptionDetail}>{detail}</Text>
                  <Text style={styles.descriptionDetal}>{description}</Text>
                  <Text style={styles.statusAvailable}>{status}</Text>
                  <Text style={styles.priceDetail}>{price}</Text>
               </View>
            </View>
         </TouchableOpacity>
      </View>
   );
};

export default ListDetail;
