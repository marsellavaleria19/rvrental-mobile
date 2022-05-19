import * as React from 'react';
import {
   Text,
   View,
   StyleSheet,
   Image,
   TouchableOpacity,
   ScrollView,
} from 'react-native';
import {styles} from '../../assets/styles/styles';
import Container from '../../components/Container';
import CButton from '../../components/Button';
import stylePrimary from '../../assets/styles/stylePrimary';
import {rateLayout} from '../../assets/styles/styleComponent';
import Rate from '../../components/Rate';
import IconInfo from 'react-native-vector-icons/Ionicons';
import {historyInput} from '../../redux/actions/history';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useEffect, useState} from 'react';
import StepperPayment from '../../components/StepperPayment';
import NBModalLoading from '../../components/NBModalLoading';
import NBModalSuccess from '../../components/NBModalSuccess';
import NBModalError from '../../components/NBModalError';
import photoItem from '../../assets/images/image-item.png';
import NumberFormat from 'react-number-format';

const PaymentDetail = ({navigation}) => {
   const {payment, history, reservation, auth} = useSelector(state => state);
   const dispatch = useDispatch();
   const [control, setControl] = useState(false);
   const [showModalSuccess, setShowModalSuccess] = useState(false);
   const handleCloseModalSuccess = () => setShowModalSuccess(false);
   const [showModalError, setShowModalError] = useState(false);
   const handleCloseModalError = () => setShowModalError(false);
   const [showModalLoading, setShowModalLoading] = useState(false);
   const [messageError, setMessageError] = useState('');
   const [messageSuccess, setMessageSuccess] = useState('');
   // React.useEffect(() => {
   //    dispatch(getDetailPayment(idHistory));
   // }, []);

   // useEffect(() => {
   //    if (history.dataHistory !== null && control) {
   //       navigation.navigate('FinishPayment', {
   //          idHistory: history.dataHistory.id,
   //       });
   //    }
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [history.dataHistory]);

   useEffect(() => {
      setShowModalLoading(history.isLoading);
      if (history.isLoading == false && control == true) {
         if (history.isError) {
            setMessageError(history.errMessage);
            setShowModalError(true);
         } else {
            setMessageSuccess('Transaction created successfully.');
            setShowModalSuccess(true);
            setControl(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [history.isLoading]);

   const paymentHandle = () => {
      dispatch(
         historyInput(
            reservation.dataReservation,
            auth.user.id,
            payment.dataPayment,
            auth.token,
         ),
      );
      setControl(true);
   };

   return (
      <View style={styles.background}>
         <ScrollView>
            <Container>
               <View style={addStyles.layoutStepper}>
                  <StepperPayment active={2} count={3} />
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
                     button={'Go to finish payment'}
                     functionHandle={() =>
                        navigation.navigate('FinishPayment', {
                           idHistory: history.dataHistory.id,
                        })
                     }
                  />
               )}
               <View style={addStyles.positionRate}>
                  <Image
                     source={
                        reservation.dataReservation.photo !== null
                           ? {uri: `${reservation.dataReservation.photo}`}
                           : photoItem
                     }
                     style={addStyles.imageBackground}
                  />
                  <View style={addStyles.rateLayout}>
                     <Rate rate={3.5} />
                  </View>
               </View>
               <View style={addStyles.layoutDescription}>
                  <Text style={addStyles.fontDescription}>
                     {reservation.dataReservation.qty}{' '}
                     {reservation.dataReservation.brand}
                  </Text>
                  <Text style={addStyles.fontDescription}>
                     {payment.dataPayment.paymentType}
                  </Text>
                  <Text style={addStyles.fontDescription}>
                     {reservation.dataReservation.day} days{' '}
                  </Text>
                  <Text style={addStyles.fontDescription}>
                     {moment(reservation.dataReservation.rentStartDate).format(
                        'DD MMM YYYY',
                     )}{' '}
                     to{' '}
                     {moment(reservation.dataReservation.rentEndDate).format(
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
                  <IconInfo
                     name="information-circle-sharp"
                     style={addStyles.iconInfo}
                  />
               </View>
               <View style={addStyles.layoutButton}>
                  <TouchableOpacity onPress={paymentHandle}>
                     <CButton
                        classButton={styles.buttonPayment}
                        textButton={styles.fontButtonPayment}>
                        Get Payment Code
                     </CButton>
                  </TouchableOpacity>
               </View>
            </Container>
         </ScrollView>
      </View>
   );
};

const addStyles = StyleSheet.create({
   imageBackground: {
      width: '100%',
      height: 201,
      borderRadius: 20,
   },
   layoutStepper: {
      marginTop: 50,
   },
   positionRate: {
      position: 'relative',
      height: 201,
      marginTop: 40,
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
      width: '100%',
      height: 2,
      backgroundColor: '#DFDEDE',
   },
   layoutPrice: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   price: {
      fontSize: 30,
      fontWeight: '700',
      color: stylePrimary.mainColor,
   },
   iconInfo: {
      fontSize: 36,
      color: stylePrimary.secondaryColor,
   },
   layoutButton: {
      marginTop: 30,
      marginBottom: 20,
   },
});

export {addStyles};

export default PaymentDetail;
