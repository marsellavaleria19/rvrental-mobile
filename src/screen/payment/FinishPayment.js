import * as React from 'react';
import {
   Text,
   View,
   StyleSheet,
   ImageBackground,
   Image,
   TouchableOpacity,
} from 'react-native';
import Container from '../../components/Container';
import CButton from '../../components/Button';
import stylePrimary from '../../assets/styles/stylePrimary';
import IconInfo from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {getDetailPayment} from '../../redux/actions/payment';
import {useEffect, useState} from 'react';
import moment from 'moment';
import {paymentUpdate} from '../../redux/actions/payment';
import {styles} from '../../assets/styles/styles';

const FinishPayment = ({route, navigation}) => {
   const {payment, auth} = useSelector(state => state);
   const dispatch = useDispatch();
   const {idHistory} = route.params;
   const [control, setControl] = useState(false);

   // useEffect(() => {
   //    dispatch(getDetailPayment(idHistory));
   // }, []);

   useEffect(() => {
      if (payment.dataPayment !== null && control) {
         navigation.navigate('SuccessPayment', {idHistory: idHistory});
      }
      setControl(false);
   }, [control, idHistory, navigation, payment.dataPayment]);

   const finishPaymentHandle = () => {
      dispatch(
         paymentUpdate(auth.token, payment.dataPayment.totalPayment, idHistory),
      );
      setControl(true);
   };

   return (
      <View>
         <ScrollView>
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
                  <View style={addStyles.layoutCode}>
                     <Text style={addStyles.text}>Booking code :</Text>
                     <Text style={addStyles.textCode}>VSP09875</Text>
                  </View>
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
                  <Text style={addStyles.fontDescription}>
                     Order Details :{' '}
                  </Text>
                  <Text style={addStyles.fontDescription}>
                     {payment.dataPayment.qty} {payment.dataPayment.brand}
                  </Text>
                  <Text style={addStyles.fontDescription}>
                     {payment.dataPayment.payment_type}
                  </Text>
                  <Text style={addStyles.fontDescription}>
                     {payment.dataPayment.day} days{' '}
                  </Text>
                  <Text style={addStyles.fontDescription}>
                     {moment(payment.dataPayment.rentStartDate).format(
                        'DD MMM YYYY',
                     )}{' '}
                     to{' '}
                     {moment(payment.dataPayment.rentEndDate).format(
                        'DD MMM YYYY',
                     )}
                  </Text>
               </View>
               <View style={addStyles.line} />
               <View style={addStyles.layoutPrice}>
                  <Text style={addStyles.price}>
                     Rp. {payment.dataPayment.totalPayment}
                  </Text>
                  <IconInfo
                     name="information-circle-sharp"
                     style={addStyles.iconInfo}
                  />
               </View>
               <View style={addStyles.layoutButton}>
                  <TouchableOpacity onPress={finishPaymentHandle}>
                     <CButton
                        classButton={styles.buttonPayment}
                        textButton={styles.fontButtonPayment}>
                        Finish Payment
                     </CButton>
                  </TouchableOpacity>
               </View>
            </Container>
         </ScrollView>
      </View>
   );
};

const addStyles = StyleSheet.create({
   paymentCode: {
      fontSize: 36,
      fontWeight: stylePrimary.bold,
      marginTop: 9,
   },
   textPaymentCode: {
      fontSize: 18,
      fontWeight: stylePrimary.bold,
   },
   layoutPaymentCode: {
      alignItems: 'center',
      marginTop: 36,
   },
   textDetail: {
      fontSize: 13,
      color: '#616167',
      marginTop: 5,
      textAlign: 'center',
   },
   time: {
      color: '#9B0A0A',
      fontSize: 24,
      fontWeight: stylePrimary.bold,
      marginTop: 9,
   },
   layoutCode: {
      flexDirection: 'row',
      justifyContent: 'center',
   },
   text: {
      fontSize: 16,
      marginTop: 6,
      textAlign: 'center',
   },
   textCode: {
      fontSize: 16,
      marginTop: 6,
      color: 'green',
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
      fontWeight: stylePrimary.bold,
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
      fontWeight: stylePrimary.bold,
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
      width: '100%',
      height: 2,
      backgroundColor: '#DFDEDE',
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
      fontWeight: stylePrimary.bold,
   },
   iconInfo: {
      fontSize: 36,
      color: '#DFDEDE',
   },
   layoutButton: {
      marginTop: 30,
      marginBottom: 30,
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
      fontWeight: stylePrimary.bold,
   },
});

export {addStyles};

export default FinishPayment;
