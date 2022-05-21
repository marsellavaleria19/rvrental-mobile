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
import {NBAlert} from '../../components/NBAlert';
import {ScrollView} from 'native-base';
import NBModalLoading from '../../components/NBModalLoading';
import NBModalError from '../../components/NBModalError';
import NBModalSuccess from '../../components/NBModalSuccess';
import NBInput from '../../components/NBInput';
import {validation} from '../../helpers/validation';

const ChangePassowrd = ({navigation}) => {
   const {auth} = useSelector(state => state);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [code, setCode] = useState('');
   const dispatch = useDispatch();
   const [showModalSuccess, setShowModalSuccess] = useState(false);
   const handleCloseModalSuccess = () => setShowModalSuccess(false);
   const [showModalError, setShowModalError] = useState(false);
   const handleCloseModalError = () => setShowModalError(false);
   const [showModalLoading, setShowModalLoading] = useState(false);
   const [messageError, setMessageError] = useState('');
   const [messageSuccess, setMessageSuccess] = useState('');
   const [control, setControl] = useState(false);
   const [errValidation, setErrValidation] = useState({});

   useEffect(() => {
      setShowModalLoading(auth.isLoading);
      if (auth.isLoading == false && control == true) {
         if (auth.isError) {
            setMessageError(auth.errMessage);
            setShowModalError(true);
         } else {
            setMessageSuccess(auth.message);
            setShowModalSuccess(true);
            setControl(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [auth.isLoading]);

   const changePasswordHandle = () => {
      const data = {
         email: email,
         code: code,
         password: password,
         'confirm password': confirmPassword,
      };

      const requirement = {
         email: 'required|email',
         code: 'required|number',
         password: 'required',
         'confirm password': 'required',
      };

      const validate = validation(data, requirement);
      if (Object.keys(validate).length == 0) {
         if (password == confirmPassword) {
            dispatch(
               confirmForgotPasswordProcess(
                  email,
                  code,
                  password,
                  confirmPassword,
               ),
            );
            setControl(true);
         } else {
            setMessageError('Password and Confirm Password not match');
            setShowModalError(true);
         }
      } else {
         setErrValidation(validate);
      }
   };

   return (
      <View style={styles.background}>
         <ScrollView>
            <ImageBackground
               source={image}
               resizeMode="cover"
               style={styles.image}>
               <View style={styles.containerScreenForgotPassword}>
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
                              button={'Go to login'}
                              functionHandle={() =>
                                 navigation.navigate('Login')
                              }
                           />
                        )}
                        <View style={addStyles.layoutInput}>
                           <NBInput
                              classVariant="loginSignup"
                              placeholder="email"
                              value={email}
                              change={setEmail}
                              isValidate={
                                 Object.keys(errValidation).length > 0 &&
                                 errValidation.email &&
                                 true
                              }
                              errorMessage={
                                 Object.keys(errValidation).length > 0 &&
                                 errValidation.email
                              }
                           />
                        </View>
                        <View style={addStyles.layoutInput}>
                           <NBInput
                              classVariant="loginSignup"
                              placeholder="Code"
                              value={code}
                              change={setCode}
                              isValidate={
                                 Object.keys(errValidation).length > 0 &&
                                 errValidation.code &&
                                 true
                              }
                              errorMessage={
                                 Object.keys(errValidation).length > 0 &&
                                 errValidation.code
                              }
                           />
                        </View>
                        <View style={addStyles.layoutInput}>
                           <NBInput
                              classVariant="loginSignup"
                              secure={true}
                              placeholder="Password"
                              value={password}
                              change={setPassword}
                              isValidate={
                                 Object.keys(errValidation).length > 0 &&
                                 errValidation.password &&
                                 true
                              }
                              errorMessage={
                                 Object.keys(errValidation).length > 0 &&
                                 errValidation.password
                              }
                           />
                        </View>
                        <View style={addStyles.layoutInput}>
                           <NBInput
                              classVariant="loginSignup"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              secure={true}
                              change={setConfirmPassword}
                              isValidate={
                                 Object.keys(errValidation).length > 0 &&
                                 errValidation['confirm password'] &&
                                 true
                              }
                              errorMessage={
                                 Object.keys(errValidation).length > 0 &&
                                 errValidation['confirm password']
                              }
                           />
                        </View>

                        <TouchableOpacity onPress={changePasswordHandle}>
                           <CButton
                              classButton={addStyles.buttonForgotPassword}
                              textButton={addStyles.textForgotPassword}>
                              Change Passowrd
                           </CButton>
                        </TouchableOpacity>
                     </View>
                  </Container>
               </View>
            </ImageBackground>
         </ScrollView>
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
   layoutInput: {
      marginBottom: 18,
   },
   input: {
      backgroundColor: 'rgba(180, 180, 180, 0.6)',
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
      marginBottom : 20,
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
