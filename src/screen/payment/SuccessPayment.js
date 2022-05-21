import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/styles/styles';
import Container from '../../components/Container';
import CButton from '../../components/Button';
import stylePrimary from '../../assets/styles/stylePrimary';
import {rateLayout} from '../../assets/styles/styleComponent';
import Rate from '../../components/Rate';
import {ScrollView} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {useState} from 'react';
import photoItem from '../../assets/images/image-item.png';
import NumberFormat from 'react-number-format';
import {
   getListHistory,
   getListHistoryByUserId,
} from '../../redux/actions/history';

const SuccessPayment = ({route, navigation}) => {
   const {history, auth} = useSelector(state => state);
   const dispatch = useDispatch();
   const {idHistory} = route.params;
   const [control, setControl] = useState(false);

   // useEffect(() => {
   //    if (history.listHistory.length > 0 && control) {
   //       navigation.navigate('HistoryNav');
   //    }
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [history.listHistory]);

   const successPaymentHandle = () => {
      if (auth.token !== 'admin') {
         dispatch(getListHistoryByUserId(auth.token, auth.user.id));
      } else {
         dispatch(getListHistory(auth.token));
      }
      navigation.navigate('History');
   };

   return (
      <View style={styles.background}>
         <ScrollView>
            <Container>
               <Text style={addStyles.statusPayment}>Payment Success!</Text>
               <View style={addStyles.positionRate}>
                  <Image
                     source={
                        history.dataHistory.photo !== null
                           ? {uri: `${history.dataHistory.photo}`}
                           : photoItem
                     }
                     style={addStyles.imageBackground}
                  />
                  <View style={addStyles.rateLayout}>
                     <Rate rate={history.dataHistory.rate} />
                  </View>
               </View>
               <View style={addStyles.layoutDescription}>
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
               <View style={addStyles.layoutFontUser}>
                  <Text style={addStyles.fontUser}>
                     ID :{' '}
                     {history.dataHistory.idCard !== null
                        ? history.dataHistory.idCard
                        : ''}
                  </Text>
                  <Text style={addStyles.fontUser}>
                     {history.dataHistory.fullname} (
                     {history.dataHistory.emailAddress})
                  </Text>
                  <View style={addStyles.layoutPhoneStatus}>
                     <Text style={addStyles.fontUser}>
                        {history.dataHistory.mobilePhone}{' '}
                     </Text>
                     <Text style={addStyles.fontActive}>(active)</Text>
                  </View>
                  <Text style={addStyles.fontUser}>
                     {history.dataHistory.location}
                  </Text>
               </View>
               <View style={addStyles.layoutButton}>
                  <TouchableOpacity onPress={successPaymentHandle}>
                     <CButton
                        classButton={addStyles.buttonPayment}
                        textButton={addStyles.fontButtonPayment}>
                        <NumberFormat
                           value={history.dataHistory.prepayment}
                           displayType={'text'}
                           thousandSeparator={true}
                           decimalSeparator="."
                           prefix={'Rp.'}
                           renderText={value => (
                              <Text style={addStyles.fontButtonPayment}>
                                 {value !== null
                                    ? value.split(',').join('.')
                                    : 0}
                              </Text>
                           )}
                        />
                        {/* {history.dataHistory.prepayment.toLocaleString('id-ID')} */}
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
      marginBottom: 20,
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
   statusPayment: {
      fontSize: 24,
      fontWeight: stylePrimary.bold,
      marginTop: 35,
      color: 'green',
      textAlign: 'center',
   },
});

export {addStyles};

export default SuccessPayment;
