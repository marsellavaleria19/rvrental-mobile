import * as React from 'react';
import {
   Text,
   View,
   StyleSheet,
   ImageBackground,
   TouchableOpacity,
} from 'react-native';
import {styles} from '../../assets/styles/styles';
import Container from '../../components/Container';
import Input from '../../components/Input';
import CButton from '../../components/Button';
import stylePrimary from '../../assets/styles/stylePrimary';
import {input, button} from '../../assets/styles/styleComponent';
import image from '../../assets/images/background-forgot-password.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPasswordProcess} from '../../redux/actions/auth';
import {NBAlert} from '../../components/NBAlert';

const ForgotPassowrd = ({navigation}) => {
   const {auth} = useSelector(state => state);
   const [email, setEmail] = useState('');
   const dispatch = useDispatch();
   const [success, setSuccess] = useState(false);

   useEffect(() => {
      if (auth.message !== '' && auth.isSubmitEmail == true && success) {
         navigation.navigate('ChangePassword');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [auth.message]);

   const forgotPasswordHandle = () => {
      dispatch(forgotPasswordProcess(email));
      setSuccess(true);
   };

   return (
      <View style={styles.background}>
         <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}>
            <Container>
               <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                  style={addStyles.layoutBack}>
                  <Icon name="chevron-left" style={addStyles.iconBack} />
                  <Text style={addStyles.textBack}>Back</Text>
               </TouchableOpacity>
               <Text style={addStyles.textTitle}>
                  THAT’S OKAY, WE GOT YOUR BACK
               </Text>
               <View style={addStyles.layoutLinkForgotPassword}>
                  <Text style={addStyles.text}>
                     Enter your email to get reset password code.
                  </Text>
               </View>
               <View>
                  {auth.isError && (
                     <NBAlert status="error" message={auth.errMessage} />
                  )}
                  <Input
                     classInput={addStyles.input}
                     placeholder="Enter your email address"
                     value={email}
                     change={setEmail}
                  />
                  <TouchableOpacity onPress={forgotPasswordHandle}>
                     <CButton
                        classButton={addStyles.buttonForgotPassword}
                        textButton={addStyles.textForgotPassword}>
                        Send Code
                     </CButton>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={forgotPasswordHandle}>
                     <CButton
                        classButton={addStyles.buttonResendCode}
                        textButton={addStyles.textResendCode}>
                        Resend Code
                     </CButton>
                  </TouchableOpacity>
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
   buttonResendCode: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      ...button,
   },
   textResendCode: {
      color: stylePrimary.mainColor,
      fontWeight: '900',
      fontSize: 18,
   },
   layoutBack: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   iconBack: {
      color: '#FFFFFF',
      fontSize: 22,
      marginRight: 30,
   },
   textBack: {
      color: 'white',
      fontSize: 18,
      fontWeight: '700',
   },
});

export {addStyles};

export default ForgotPassowrd;
