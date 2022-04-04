import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground, Image} from 'react-native';
import {styles} from '../../assets/styles/styles';
import Container from '../../components/Container';
import CButton from '../../components/Button';
import stylePrimary from '../../assets/styles/stylePrimary';
import {rateLayout, rateText} from '../../assets/styles/styleComponent';
import imageBackground from '../../assets/images/background-reservation.png';
import Rate from '../../components/Rate';
import {ScrollView} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getDetailPayment} from '../../redux/actions/payment';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {useEffect} from 'react';

const SuccessPayment = ({route, navigation}) => {
   const {payment, auth} = useSelector(state => state);
   const dispatch = useDispatch();
   const {idHistory} = route.params;

   // useEffect(() => {
   //    dispatch(getDetailPayment(idHistory));
   // }, []);

   return (
      <SafeAreaView>
         <ScrollView>
            <Container>
               <View style={addStyles.positionRate}>
                  <Image
                     source={imageBackground}
                     style={addStyles.imageBackground}
                  />
                  <View style={addStyles.rateLayout}>
                     <Rate rate={4.5} />
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
               <View style={addStyles.layoutFontUser}>
                  <Text style={addStyles.fontUser}>
                     ID :{' '}
                     {payment.dataPayment.idCard !== null
                        ? payment.dataPayment.idCard
                        : ''}
                  </Text>
                  <Text style={addStyles.fontUser}>
                     {payment.dataPayment.fullname} (
                     {payment.dataPayment.emailAddress})
                  </Text>
                  <View style={addStyles.layoutPhoneStatus}>
                     <Text style={addStyles.fontUser}>
                        {payment.dataPayment.mobilePhone}{' '}
                     </Text>
                     <Text style={addStyles.fontActive}>(active)</Text>
                  </View>
                  <Text style={addStyles.fontUser}>
                     {payment.dataPayment.location}
                  </Text>
               </View>
               <View style={addStyles.layoutButton}>
                  <CButton
                     classButton={addStyles.buttonPayment}
                     press={
                        (() => navigation.navigate('History'),
                        {idUser: auth.user.id})
                     }
                     textButton={addStyles.fontButtonPayment}>
                     Total : {payment.dataPayment.totalPayment}
                  </CButton>
               </View>
            </Container>
         </ScrollView>
      </SafeAreaView>
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
      marginBottom: 10,
   },
   line: {
      width: '100%',
      height: 2,
      backgroundColor: '#DFDEDE',
      marginTop: 16,
   },
   layoutFontUser: {
      marginTop: 29,
   },
   layoutPhoneStatus: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   fontUser: {
      fontSize: 16,
      color: '#616167',
      marginTop: 5,
   },
   fontActive: {
      color: 'green',
      fontSize: 16,
      fontWeight: stylePrimary.bold,
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
      fontSize: 24,
      fontWeight: stylePrimary.bold,
      color: stylePrimary.mainColor,
   },
});

export {addStyles};

export default SuccessPayment;
