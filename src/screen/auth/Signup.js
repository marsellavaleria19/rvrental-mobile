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
import image from '../../assets/images/background-signup.png';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registrationProcess} from '../../redux/actions/auth';
import {ScrollView} from 'native-base';
import NBInput from '../../components/NBInput';
import {NBAlert} from '../../components/NBAlert';
import {validation} from '../../helpers/validation';
import NBModalError from '../../components/NBModalError';
import NBModalSuccess from '../../components/NBModalSuccess';
import NBModalLoading from '../../components/NBModalLoading';

const Signup = ({navigation}) => {
   const {auth} = useSelector(state => state);
   const [inputUser, setInputUser] = useState({
      email: '',
      username: '',
      name: '',
      'mobile number': '',
      password: '',
   });
   const dispatch = useDispatch();
   const [control, setControl] = useState(false);
   const [errValidation, setErrValidation] = useState({});
   const [showModalSuccess, setShowModalSuccess] = useState(false);
   const handleCloseModalSuccess = () => setShowModalSuccess(false);
   const [showModalError, setShowModalError] = useState(false);
   const handleCloseModalError = () => setShowModalError(false);
   const [showModalLoading, setShowModalLoading] = useState(false);
   const [messageError, setMessageError] = useState('');
   const [messageSuccess, setMessageSuccess] = useState('');

   useEffect(() => {
      dispatch({
         type: 'CLEAR_AUTH',
      });
      setErrValidation({});
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

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

   const signupHandle = () => {
      let requirement = {
         username: 'required',
         name: 'required',
         'mobile number': 'required|number|phone',
         email: 'required',
         password: 'required',
      };
      var validate = validation(inputUser, requirement);
      if (Object.keys(validate).length == 0) {
         dispatch(registrationProcess(inputUser));
         setControl(true);
      } else {
         setErrValidation(validate);
      }
   };

   return (
      <View style={styles.background}>
         <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}>
            <View style={styles.containerScreen}>
               <Container>
                  <ScrollView>
                     <Text style={addStyles.textTitle}>
                        LET’S HAVE SOME RIDE
                     </Text>
                     <View style={addStyles.layoutForm}>
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
                              button={'Go to Login'}
                              functionHandle={() =>
                                 navigation.navigate('Login')
                              }
                           />
                        )}
                        <NBInput
                           classVariant="loginSignup"
                           placeholder="Name"
                           value={inputUser.name}
                           change={newName =>
                              setInputUser({...inputUser, name: newName})
                           }
                           isValidate={
                              Object.keys(errValidation).length > 0 && true
                           }
                           errorMessage={
                              Object.keys(errValidation).length > 0 &&
                              errValidation.name
                           }
                        />
                        <NBInput
                           classVariant="loginSignup"
                           placeholder="Email"
                           value={inputUser.email}
                           change={newEmail =>
                              setInputUser({...inputUser, email: newEmail})
                           }
                           isValidate={
                              Object.keys(errValidation).length > 0 && true
                           }
                           errorMessage={
                              Object.keys(errValidation).length > 0 &&
                              errValidation.email
                           }
                        />
                        <NBInput
                           classVariant="loginSignup"
                           placeholder="Username"
                           value={inputUser.username}
                           change={newUsername =>
                              setInputUser({
                                 ...inputUser,
                                 username: newUsername,
                              })
                           }
                           isValidate={
                              Object.keys(errValidation).length > 0 && true
                           }
                           errorMessage={
                              Object.keys(errValidation).length > 0 &&
                              errValidation.username
                           }
                        />
                        <NBInput
                           classVariant="loginSignup"
                           placeholder="Mobile phone"
                           value={inputUser['mobile number']}
                           change={newMobileNumber =>
                              setInputUser({
                                 ...inputUser,
                                 'mobile number': newMobileNumber,
                              })
                           }
                           isValidate={
                              Object.keys(errValidation).length > 0 && true
                           }
                           errorMessage={
                              Object.keys(errValidation).length > 0 &&
                              errValidation['mobile number']
                           }
                        />
                        <NBInput
                           classVariant="loginSignup"
                           placeholder="Password"
                           value={inputUser.password}
                           change={newPassword =>
                              setInputUser({
                                 ...inputUser,
                                 password: newPassword,
                              })
                           }
                           secure={true}
                           isValidate={
                              Object.keys(errValidation).length > 0 && true
                           }
                           errorMessage={
                              Object.keys(errValidation).length > 0 &&
                              errValidation.password
                           }
                        />
                        <TouchableOpacity onPress={signupHandle}>
                           <CButton
                              classButton={addStyles.buttonSignup}
                              textButton={addStyles.textSignup}>
                              Signup
                           </CButton>
                        </TouchableOpacity>
                        <View style={addStyles.layoutLinkLogin}>
                           <Text style={addStyles.text}>
                              Already have account?
                           </Text>
                           <TouchableOpacity
                              onPress={() => navigation.navigate('Login')}>
                              <Text style={addStyles.textLink}>Login now</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </ScrollView>
               </Container>
            </View>
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
      marginTop: 18,
      backgroundColor: 'rgba(180, 180, 180, 0.5)',
      fontSize: stylePrimary.baseFontSize,
      ...input,
   },
   layoutLinkLogin: {
      marginTop: 40,
      justifyContent: 'center',
      flexDirection: 'row',
   },
   text: {
      color: stylePrimary.baseFontColor,
      fontSize: 14,
      marginTop: 10,
      marginBottom: 30,
   },
   textLink: {
      fontWeight: '700',
      color: stylePrimary.baseFontColor,
      fontSize: 14,
      marginTop: 10,
      marginBottom: 30,
      marginLeft: 5,
   },
   layoutForm: {
      marginTop: 50,
   },
   buttonSignup: {
      backgroundColor: stylePrimary.secondaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
      ...button,
   },
   textSignup: {
      color: stylePrimary.mainColor,
      fontWeight: '900',
      fontSize: 18,
   },
});

export {addStyles};

export default Signup;
