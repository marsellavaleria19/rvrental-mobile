import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {styles} from '../assets/styles/styles';
import IconStar from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
// import { FontAwesome } from '@expo/vector-icons';
// import {image} from '../assets/images/backgroud-image.png'

const ListHistoryFavorite = ({
   title,
   path,
   status,
   payment,
   reservationDate,
   isHistory,
   location,
}) => {
   return (
      <View>
         <View style={styles.layoutList}>
            <View style={styles.layoutImageRating}>
               <Image source={path} style={styles.imageCategory} />
            </View>
            <View style={styles.layoutDetail}>
               <Text style={styles.titleDetail}>{title}</Text>
               <Text style={styles.descriptionDetail}>{reservationDate}</Text>
               <Text style={styles.priceDetail}>{payment}</Text>
               {isHistory == true ? (
                  <Text style={styles.statusAvailable}>{status}</Text>
               ) : (
                  <Text style={styles.statusAvailable}>{location}</Text>
               )}
            </View>
         </View>
      </View>
   );
};

export default ListHistoryFavorite;
