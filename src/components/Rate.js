 import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import Constants from 'expo-constants';
import {styles} from '../assets/styles/styles'
import stylePrimary from '../assets/styles/stylePrimary'
import MainBarTitle from './mainBarTitle'
// import { FontAwesome } from '@expo/vector-icons'; 
// import {image} from '../assets/images/backgroud-image.png'

const Rate = ({rate,variant,children})=>{
  return (
    <View>
      <View style={styles.rateLayout}>
        <Text style={styles.rateText}>{rate}
        {/* <span><FontAwesome name="star" style={styles.rateIcon}/></span> */}
        </Text>
      </View>
    </View>
  )
}

export default Rate