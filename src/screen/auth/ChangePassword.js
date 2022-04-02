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
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {confirmForgotPasswordProcess} from '../../redux/actions/auth';

const ChangePassowrd = ({navigation}) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [code, setCode] = useState('');
   const dispatch = useDispatch();
   const [success, setSuccess] = useState(false);

   useEffect(() => {
      if (success) {
         navigation.navigate('Login');
      }
   }, [success]);

   const changePasswordHandle = () => {
      dispatch(
         confirmForgotPasswordProcess(email, code, password, confirmPassword),
      );
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
               <View>
                  <Input
                     classInput={addStyles.input}
                     value={email}
                     change={setEmail}
                     placeholder="Email"
                  />
                  <Input
                     classInput={addStyles.input}
                     value={code}
                     change={setCode}
                     secure={true}
                     placeholder="Code"
                  />
                  <Input
                     classInput={addStyles.input}
                     value={password}
                     change={setPassword}
                     secure={true}
                     placeholder="Password"
                  />
                  <Input
                     classInput={addStyles.input}
                     value={confirmPassword}
                     change={setConfirmPassword}
                     secure={true}
                     placeholder="Confirm Password"
                  />
                  <TouchableOpacity onPress={changePasswordHandle}>
                     <CButton
                        classButton={addStyles.buttonForgotPassword}
                        textButton={addStyles.textForgotPassword}>
                        Change Passowrd
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

export default ChangePassowrd;
