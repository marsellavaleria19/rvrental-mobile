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
import NBInput from '../../components/NBInput';
import CButton from '../../components/Button';
import stylePrimary from '../../assets/styles/stylePrimary';
import {input, button} from '../../assets/styles/styleComponent';
import image from '../../assets/images/backgroud-image.png';
import {useSelector, useDispatch} from 'react-redux';
import {NBAlert} from '../../components/NBAlert';
import {useState, useEffect} from 'react';
import {loginProcess} from '../../redux/actions/auth';
import {validation} from '../../helpers/validation';
import {ScrollView} from 'native-base';
import NBModalError from '../../components/NBModalError';
import NBModalSuccess from '../../components/NBModalSuccess';
import NBModalLoading from '../../components/NBModalLoading';
import {SafeAreaView} from 'react-native-safe-area-context';

const Login = ({navigation}) => {
   const {auth} = useSelector(state => state);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
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

   const loginHandle = () => {
      let requirement = {
         email: 'required|email',
         password: 'required',
      };
      let data = {
         email: email,
         password: password,
      };
      var validate = validation(data, requirement);

      if (Object.keys(validate).length == 0) {
         dispatch(loginProcess(email, password));
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
                        LET’S EXPLORE THE WORLD
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
                              button={'Go to Home'}
                              functionHandle={() => navigation.navigate('Home')}
                           />
                        )}
                        <NBInput
                           classVariant="loginSignup"
                           placeholder="Email"
                           value={email}
                           change={setEmail}
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
                           placeholder="password"
                           secure={true}
                           value={password}
                           change={setPassword}
                           isValidate={
                              Object.keys(errValidation).length > 0 && true
                           }
                           errorMessage={
                              Object.keys(errValidation).length > 0 &&
                              errValidation.password
                           }
                        />
                        <TouchableOpacity
                           onPress={() =>
                              navigation.navigate('ForgotPassword')
                           }>
                           <Text style={addStyles.text}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={loginHandle}>
                           <CButton
                              classButton={addStyles.buttonLogin}
                              textButton={addStyles.textLogin}>
                              Login
                           </CButton>
                        </TouchableOpacity>
                        <View style={addStyles.layoutLinkSignup}>
                           <Text style={addStyles.text}>
                              Don’t have account?
                           </Text>
                           <TouchableOpacity
                              onPress={() => navigation.navigate('Signup')}>
                              <Text style={addStyles.textLink}>
                                 Sign up now
                              </Text>
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
   layoutLinkSignup: {
      marginTop: 40,
      textAlign: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
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
   buttonLogin: {
      backgroundColor: stylePrimary.secondaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      ...button,
   },
   textLogin: {
      color: stylePrimary.mainColor,
      fontWeight: '900',
      fontSize: 18,
   },
});

export {addStyles};

export default Login;
