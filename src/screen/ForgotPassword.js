import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import Input from '../components/Input';
import CButton from '../components/Button';
import stylePrimary from '../assets/styles/stylePrimary';
import {input, button} from '../assets/styles/styleComponent';
import image from '../assets/images/background-forgot-password.png';

const ForgotPassowrd = () => {
   return (
      <View style={styles.background}>
         <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}>
            <Container>
               <Text style={addStyles.textTitle}>
                  THAT’S OKAY, WE GOT YOUR BACK
               </Text>
               <View style={addStyles.layoutLinkForgotPassword}>
                  <Text style={addStyles.text}>
                     Enter your email to get reset password code. If you don’t
                     receive any code.{' '}
                     <Text style={addStyles.textLink}>Resend Code</Text>
                  </Text>
                  {/* <Text style={addStyles.textLink}>Resend Code</Text> */}
               </View>
               <View>
                  <Input classInput={addStyles.input} placeholder="Email" />
                  <CButton
                     classButton={addStyles.buttonForgotPassword}
                     textButton={addStyles.textForgotPassword}>
                     Send Code
                  </CButton>
               </View>
            </Container>
         </ImageBackground>
      </View>
   );
};

const addStyles = StyleSheet.create({
   textTitle: {
      color: stylePrimary.baseFontColor,
      fontSize: stylePrimary.largeFontSize,
      lineHeight: 42,
      fontWeight: '900',
      textAlign: 'left',
      marginTop: 50,
      marginBottom: 100,
   },
   input: {
      backgroundColor: 'rgba(180, 180, 180, 0.5)',
      fontSize: stylePrimary.baseFontSize,
      ...input,
   },
   layoutLinkForgotPassword: {
      marginTop: 100,
      textAlign: 'center',
      flexDirection: 'row',
   },
   text: {
      color: stylePrimary.baseFontColor,
      fontSize: 14,
      marginTop: 10,
      marginBottom: 30,
      textAlign: 'center',
   },
   textLink: {
      fontWeight: '700',
      color: stylePrimary.baseFontColor,
      fontSize: 14,
   },
   layoutForm: {
      marginTop: 10,
   },
   buttonForgotPassword: {
      backgroundColor: stylePrimary.secondaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 31,
      ...button,
   },
   textForgotPassword: {
      color: stylePrimary.mainColor,
      fontWeight: '900',
      fontSize: 18,
   },
});

export {addStyles};

export default ForgotPassowrd;
