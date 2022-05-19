import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Container from '../../components/Container';
import CButton from '../../components/Button';
import stylePrimary from '../../assets/styles/stylePrimary';
import IconInfo from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import moment from 'moment';
import {getDetailHistory, historyUpdate} from '../../redux/actions/history';
import {styles} from '../../assets/styles/styles';
import StepperPayment from '../../components/StepperPayment';
import PushNotificationHandler from '../../helpers/PushNotificationHelper';
import NBModalLoading from '../../components/NBModalLoading';
import NBModalError from '../../components/NBModalError';
import NBModalSuccess from '../../components/NBModalSuccess';
import NumberFormat from 'react-number-format';

const FinishPayment = ({route, navigation}) => {
   const {reservation, auth, history} = useSelector(state => state);
   const dispatch = useDispatch();
   const [control, setControl] = useState(false);
   const {idHistory} = route.params;
   const [showModalSuccess, setShowModalSuccess] = useState(false);
   const handleCloseModalSuccess = () => setShowModalSuccess(false);
   const [showModalError, setShowModalError] = useState(false);
   const handleCloseModalError = () => setShowModalError(false);
   const [showModalLoading, setShowModalLoading] = useState(false);
   const [messageError, setMessageError] = useState('');
   const [messageSuccess, setMessageSuccess] = useState('');
   const [hour, setHour] = useState();
   const [minutes, setMinutes] = useState();
   const [second, setSecond] = useState();

   useEffect(() => {
      dispatch(getDetailHistory(idHistory));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (history.dataHistory !== null && control) {
         PushNotificationHandler(
            'finish-payment',
            'finish-payment',
            'Finish Payment',
            "Your order has successfully. Don't forget to do payment.",
         );
      }
      setControl(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [history.dataHistory]);

   useEffect(() => {
      setShowModalLoading(history.isLoading);
      if (history.isLoading == false && control == true) {
         if (history.isError) {
            setMessageError(history.errMessage);
            setShowModalError(true);
         } else {
            setMessageSuccess('Payment has successfully.');
            setShowModalSuccess(true);
            setControl(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [history.isLoading]);

   // const startTime = () => {
   //    const countDownDate = new Date(history.dataHistory.createdAt).getTime();
   //    interval = setInterval(() => {
   //       const now = new Date().getTime();
   //       const diffrent = countDownDate - now;
   //       const hours = Math.floor(
   //          (diffrent % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60),
   //       );
   //       const minutes = Math.floor(
   //          (diffrent % (60 * 60 * 1000)) / (1000 * 60),
   //       );

   //       const seconds = Math.floor()
   //    });
   // };

   const finishPaymentHandle = () => {
      dispatch(
         historyUpdate(auth.token, history.dataHistory.totalPayment, idHistory),
      );
      setControl(true);
   };

   return (
      <View style={styles.background}>
         <ScrollView>
            <Container>
               <View style={addStyles.layoutStepper}>
                  <StepperPayment active={3} count={3} />
               </View>
               <NBModalLoading show={showModalLoading} />
               {messageError !== '' && (
                  <NBModalError
                     show={showModalError}
                     message={messageError}
                     close={handleCloseModalError}
                  />
               )}
               {messageSuccess !== '' && (
                  <NBModalSuccess
                     show={showModalSuccess}
                     message={messageSuccess}
                     close={handleCloseModalSuccess}
                     button={'Go to success payment'}
                     functionHandle={() =>
                        navigation.navigate('SuccessPayment', {
                           idHistory: idHistory,
                        })
                     }
                  />
               )}
               <View style={addStyles.layoutPaymentCode}>
                  <Text style={addStyles.textPaymentCode}>Payment Code</Text>
                  <Text style={addStyles.paymentCode}>
                     {history.dataHistory.paymentCode}
                  </Text>
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
                     <Text style={addStyles.text}>PT RV Rental </Text>
                  </View>
               </View>
               <View style={addStyles.line} />
               <View style={addStyles.layoutBookingCode}>
                  <View style={addStyles.layoutCode}>
                     <Text style={addStyles.text}>Booking code :</Text>
                     <Text style={addStyles.textCode}>
                        {history.dataHistory.bookingCode}
                     </Text>
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
                     {history.dataHistory.qty} {history.dataHistory.brand}
                  </Text>
                  <Text style={addStyles.fontDescription}>
                     {history.dataHistory.payment_type}
                  </Text>
                  <Text style={addStyles.fontDescription}>
                     {history.dataHistory.day} days{' '}
                  </Text>
                  <Text style={addStyles.fontDescription}>
                     {moment(history.dataHistory.rentStartDate).format(
                        'DD MMM YYYY',
                     )}{' '}
                     to{' '}
                     {moment(history.dataHistory.rentEndDate).format(
                        'DD MMM YYYY',
                     )}
                  </Text>
               </View>
               <View style={addStyles.line} />
               <View style={addStyles.layoutPrice}>
                  <NumberFormat
                     value={reservation.dataReservation.totalPayment}
                     displayType={'text'}
                     thousandSeparator={true}
                     decimalSeparator="."
                     prefix={'Rp.'}
                     renderText={value => (
                        <Text style={addStyles.price}>
                           {value !== null ? value.replace(',', '.') : 0}
                        </Text>
                     )}
                  />
                  {/* <Text style={addStyles.price}>
                     Rp.{' '}
                     {reservation.dataReservation.totalPayment.toLocaleString(
                        'id-ID',
                     )}
                  </Text> */}
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
   layoutStepper: {
      marginTop: 50,
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
      color: stylePrimary.mainColor,
      fontWeight: stylePrimary.bold,
   },
   iconInfo: {
      fontSize: 36,
      color: stylePrimary.secondaryColor,
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
