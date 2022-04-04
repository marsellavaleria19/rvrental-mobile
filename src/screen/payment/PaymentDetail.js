import * as React from 'react';
import {
   Text,
   View,
   StyleSheet,
   ImageBackground,
   Image,
   TouchableOpacity,
} from 'react-native';
import {styles} from '../../assets/styles/styles';
import Container from '../../components/Container';
import CButton from '../../components/Button';
import stylePrimary from '../../assets/styles/stylePrimary';
import {button, rateLayout, rateText} from '../../assets/styles/styleComponent';
import imageBackground from '../../assets/images/background-reservation.png';
import Rate from '../../components/Rate';
import IconInfo from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailPayment} from '../../redux/actions/payment';
import moment from 'moment';

const PaymentDetail = ({route, navigation}) => {
   const {payment} = useSelector(state => state);
   const dispatch = useDispatch();
   const {idHistory} = route.params;

   React.useEffect(() => {
      dispatch(getDetailPayment(idHistory));
   }, []);

   return (
      <View>
         <Container>
            <View style={addStyles.positionRate}>
               <Image
                  source={{uri: `${payment.dataPayment.photo}`}}
                  style={addStyles.imageBackground}
               />
               <View style={addStyles.rateLayout}>
                  <Rate rate={3.5} />
               </View>
            </View>
            <View style={addStyles.layoutDescription}>
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
               <TouchableOpacity
                  onPress={() =>
                     navigation.navigate('FinishPayment', {
                        idHistory: idHistory,
                     })
                  }>
                  <CButton
                     classButton={styles.buttonPayment}
                     textButton={styles.fontButtonPayment}>
                     Get Payment Code
                  </CButton>
               </TouchableOpacity>
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
      color: '#DFDEDE',
   },
   layoutButton: {
      marginTop: 30,
   },
});

export {addStyles};

export default PaymentDetail;
