import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {styles} from '../assets/styles/styles';
import LinearGradient from 'react-native-linear-gradient';
import IconStar from 'react-native-vector-icons/FontAwesome';
import stylePrimary from '../assets/styles/stylePrimary';
// import { FontAwesome } from '@expo/vector-icons';
// import {image} from '../assets/images/backgroud-image.png'

const Rate = ({rate, variant, children}) => {
   return (
      <View>
         <LinearGradient
            colors={[stylePrimary.secondaryColor, '#7796b6']}
            style={styles.rateLayout}>
            <Text style={styles.rateText}>
               {rate}
               {/* <span><FontAwesome name="star" style={styles.rateIcon}/></span> */}
            </Text>
            <IconStar name="star" style={styles.rateIcon} />
         </LinearGradient>
      </View>
   );
};

export default Rate;
