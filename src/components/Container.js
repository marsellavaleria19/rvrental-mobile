import * as React from 'react';
import { Text, View, StyleSheet,ImageBackground } from 'react-native';
import {styles} from '../assets/styles/styles'
// import {image} from '../assets/images/backgroud-image.png'

const Container = ({children})=>{
  return (
    <View style={styles.container}>
      {children}    
    </View>
 
  )
}

export default Container

