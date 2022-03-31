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

const SuccessPayment = () => {
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
            <Container>
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
               <View style={addStyles.layoutFontUser}>
                  <Text style={addStyles.fontUser}>ID : 9087627392624</Text>
                  <Text style={addStyles.fontUser}>
                     Jessica Jane (jjane@mail.com)
                  </Text>
                  <Text style={addStyles.fontUser}>
                     0890876789{' '}
                     <span style={{color: 'green', fontWeight: 700}}>
                        (active)
                     </span>
                  </Text>
                  <Text style={addStyles.fontUser}>Jakarta, Indonesia</Text>
               </View>
               <View style={addStyles.layoutButton}>
                  <CButton
                     classButton={addStyles.buttonPayment}
                     textButton={addStyles.fontButtonPayment}>
                     Total : 245.000
                  </CButton>
               </View>
            </Container>
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
      marginBottom: 10,
   },
   line: {
      borderBottom: '1px solid #DFDEDE',
   },
   layoutFontUser: {
      marginTop: 29,
   },
   fontUser: {
      fontSize: 16,
      color: '#616167',
      marginTop: 5,
   },
   fontActive: {
      color: 'green',
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
      fontWeight: 700,
   },
});

export {addStyles};

export default SuccessPayment;
