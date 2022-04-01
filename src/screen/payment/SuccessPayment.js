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

const SuccessPayment = ({navigation}) => {
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
                  <View style={addStyles.layoutPhoneStatus}>
                     <Text style={addStyles.fontUser}>0890876789 </Text>
                     <Text style={addStyles.fontActive}>(active)</Text>
                  </View>
                  <Text style={addStyles.fontUser}>Jakarta, Indonesia</Text>
               </View>
               <View style={addStyles.layoutButton}>
                  <CButton
                     classButton={addStyles.buttonPayment}
                     press={() => navigation.navigate('History')}
                     textButton={addStyles.fontButtonPayment}>
                     Total : 245.000
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
