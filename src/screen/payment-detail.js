import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground, Image} from 'react-native';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import Input from '../components/Input';
import CButton from '../components/Button';
import stylePrimary from '../assets/styles/stylePrimary';
import {
   input,
   button,
   rateLayout,
   rateText,
} from '../assets/styles/styleComponent';
import {FontAwesome} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import MainBarTitle from '../components/mainBarTitle';
import ListBar from '../components/ListBar';
import imageBackground from '../assets/images/background-reservation.png';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';

const PaymentDetail = () => {
   return (
      <View>
         <Container>
            <View style={addStyles.positionRate}>
               <Image
                  source={imageBackground}
                  style={addStyles.imageBackground}
               />
               <View style={addStyles.rateLayout}>
                  <Text style={rateText}>
                     4.5
                     <span>
                        <FontAwesome name="star" style={styles.rateIcon} />
                     </span>
                  </Text>
               </View>
            </View>
            <View style={addStyles.layoutDescription}>
               <Text style={addStyles.fontDescription}>2 Vespa</Text>
               <Text style={addStyles.fontDescription}>
                  Prepayement (no tax)
               </Text>
               <Text style={addStyles.fontDescription}>4 days </Text>
               <Text style={addStyles.fontDescription}>
                  Jan 18 2021 to Jan 22 2021
               </Text>
            </View>
            <View style={addStyles.line} />
            <View style={addStyles.layoutPrice}>
               <Text style={addStyles.price}>Rp. 245.000</Text>
               <Ionicons
                  name="md-information-circle-sharp"
                  style={addStyles.iconInfo}
               />
            </View>
            <View style={addStyles.layoutButton}>
               <CButton
                  classButton={addStyles.buttonPayment}
                  textButton={addStyles.fontButtonPayment}>
                  Get Payment Code
               </CButton>
            </View>
         </Container>
      </View>
   );
};

const addStyles = StyleSheet.create({
   imageBackground: {
      width: '100%',
      height: 300,
      borderRadius: 20,
   },
   positionRate: {
      position: 'relative',
      height: 300,
   },
   rateLayout: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      ...rateLayout,
   },
   layoutDescription: {
      marginTop: 32,
   },
   fontDescription: {
      fontSize: 16,
      color: 'gray',
      marginBottom: 20,
   },
   line: {
      borderBottom: '1px solid #DFDEDE',
   },
   layoutPrice: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   price: {
      fontSize: 30,
      fontWeight: 700,
   },
   iconInfo: {
      fontSize: 36,
      color: '#DFDEDE',
   },
   layoutButton: {
      marginTop: 30,
   },
   buttonPayment: {
      backgroundColor: stylePrimary.secondaryColor,
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
      height: 70,
      borderRadius: 10,
   },
   fontButtonPayment: {
      fontSize: 20,
      fontWeight: 700,
   },
});

export {addStyles};

export default PaymentDetail;
