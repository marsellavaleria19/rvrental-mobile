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

const Reservation = () => {
   return (
      <View>
         <Container>
            <View style={addStyles.layoutPaymentCode}>
               <Text style={addStyles.textPaymentCode}>Payment Code</Text>
               <Text style={addStyles.paymentCode}>90887620</Text>
               <Text style={addStyles.textDetail}>
                  Insert your payment code while you transfer booking order
               </Text>
               <Text style={addStyles.textDetail}>Pay before : </Text>
               <Text style={addStyles.time}>1:59:34 </Text>
               <View style={addStyles.layoutBankAccount}>
                  <Text style={addStyles.text}>
                     Bank account information :{' '}
                  </Text>
                  <Text style={addStyles.bankAccount}>0290-90203-345-2</Text>
                  <Text style={addStyles.text}>Vespa Rental Jogja </Text>
               </View>
            </View>
            <View style={addStyles.line} />
            <View style={addStyles.layoutBookingCode}>
               <Text style={addStyles.text}>
                  Booking code : <span style={{color: 'green'}}>VSP09875</span>
               </Text>
               <Text style={addStyles.textDetail}>
                  Use booking code to pick up your vespa
               </Text>
               <CButton
                  classButton={addStyles.buttonPaymentCode}
                  textButton={addStyles.fontButtonPaymentCode}>
                  Copy Payment & Booking Code
               </CButton>
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
                  Finish Payment
               </CButton>
            </View>
         </Container>
      </View>
   );
};

const addStyles = StyleSheet.create({
   paymentCode: {
      fontSize: 36,
      fontWeight: 700,
      marginTop: 9,
   },
   textPaymentCode: {
      fontSize: 18,
      fontWeight: 700,
   },
   layoutPaymentCode: {
      textAlign: 'center',
      marginTop: 36,
   },
   textDetail: {
      fontSize: 13,
      color: '#616167',
      marginTop: 5,
   },
   time: {
      color: '#9B0A0A',
      fontSize: 24,
      fontWeight: 700,
      marginTop: 9,
   },
   text: {
      fontSize: 16,
      marginTop: 6,
   },
   layoutBookingCode: {
      marginTop: 17,
      textAlign: 'center',
   },
   layoutBankAccount: {
      marginTop: 6,
   },
   bankAccount: {
      fontSize: 24,
      fontWeight: 700,
      marginTop: 6,
   },
   buttonPaymentCode: {
      backgroundColor: stylePrimary.secondaryColor,
      marginTop: 24,
      justifyContent: 'center',
      alignItems: 'center',
      height: 42,
      borderRadius: 10,
   },
   fontButtonPaymentCode: {
      fontSize: 12,
      fontWeight: 700,
   },
   layoutDescription: {
      marginTop: 21,
   },
   fontDescription: {
      fontSize: 16,
      color: 'gray',
      marginBottom: 10,
   },
   line: {
      borderBottom: '1px solid #DFDEDE',
      marginTop: 16,
   },
   layoutPrice: {
      marginTop: 21,
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

export default Reservation;
