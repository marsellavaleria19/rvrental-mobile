import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {styles} from '../assets/styles/styles';
import stylePrimary from '../assets/styles/stylePrimary';
import MainBarTitle from './MainBarTitle';
import Rate from './Rate';
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
   children,
}) => {
   return (
      <View>
         <View style={styles.layoutList}>
            <View style={styles.layoutImageRating}>
               <Image source={path} style={styles.imageCategory} />
               <View style={[styles.rateLayout, {position: 'absolute'}]}>
                  {/* <Text style={styles.rateText}>{rate}<span>
               <FontAwesome name="star" style={styles.rateIcon}/></span>
            </Text> */}
               </View>
            </View>
            <View style={styles.layoutDetail}>
               <Text style={styles.titleDetail}>{title}</Text>
               <Text style={styles.descriptionDetail}>{detail}</Text>
               <Text style={styles.descriptionDetal}>{description}</Text>
               <Text style={styles.statusAvailable}>{status}</Text>
               <Text style={styles.priceDetail}>{price}</Text>
            </View>
         </View>
      </View>
   );
};

export default ListDetail;
