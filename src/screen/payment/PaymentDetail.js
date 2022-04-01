import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground, Image} from 'react-native';
import {styles} from '../../assets/styles/styles';
import Container from '../../components/Container';
import CButton from '../../components/Button';
import stylePrimary from '../../assets/styles/stylePrimary';
import {button, rateLayout, rateText} from '../../assets/styles/styleComponent';
import imageBackground from '../../assets/images/background-reservation.png';
import Rate from '../../components/Rate';
import IconInfo from 'react-native-vector-icons/Ionicons';

const PaymentDetail = ({navigation}) => {
   return (
      <View>
         <Container>
            <View style={addStyles.positionRate}>
               <Image
                  source={imageBackground}
                  style={addStyles.imageBackground}
               />
               <View style={addStyles.rateLayout}>
                  <Rate rate={3.5} />
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
               <IconInfo
                  name="information-circle-sharp"
                  style={addStyles.iconInfo}
               />
            </View>
            <View style={addStyles.layoutButton}>
               <CButton
                  classButton={styles.buttonPayment}
                  textButton={styles.fontButtonPayment}
                  press={() => navigation.navigate('FinishPayment')}>
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
