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
import NBModal from '../../components/NBModal';

const Signup = ({navigation}) => {
   const {auth} = useSelector(state => state);
   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
   const [name, setName] = useState('');
   const [mobileNumber, setMobileNumber] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();
   const [success, setSuccess] = useState(false);
   const [errValidation, setErrValidation] = useState({});
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   useEffect(() => {
      dispatch({
         type: 'CLEAR_AUTH',
      });
      setErrValidation({});
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   // useEffect(() => {
   //    if (success) {
   //       navigation.navigate('Login');
   //    }
   // }, [navigation, success]);

   const signupHandle = () => {
      let requirement = {
         username: 'required',
         name: 'required',
         mobileNumber: 'required|number|phone',
         email: 'required',
         password: 'required',
      };
      let data = {
         email: email,
         username: username,
         name: name,
         mobileNumber: mobileNumber,
         password: password,
      };
      var validate = validation(data, requirement);
      if (Object.keys(validate).length == 0) {
         dispatch(
            registrationProcess(name, username, email, password, mobileNumber),
         );
         setSuccess(true);
      } else {
         setErrValidation(validate);
      }
   };

   const showModalHandle = () => {
      console.log('masuk!!');
      return (
         <Text style={addStyles.textLink}>AAaaa</Text>
         // <NBModal
         //    title="Verified User"
         //    show={true}
         //    functionClose={handleClose}
         //    isButton={true}
         //    isButtonCancel={true}
         //    buttonTitile="Save">
         //    <Text>Are you sure want to save this data?</Text>
         // </NBModal>
      );
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
                        {auth.isError && (
                           <NBAlert status="error" message={auth.errMessage} />
                        )}
                        <NBInput
                           classVariant="loginSignup"
                           placeholder="Name"
                           value={name}
                           change={setName}
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
                           placeholder="Username"
                           value={username}
                           change={setUsername}
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
                           value={mobileNumber}
                           change={setMobileNumber}
                           isValidate={
                              Object.keys(errValidation).length > 0 && true
                           }
                           errorMessage={
                              Object.keys(errValidation).length > 0 &&
                              errValidation.mobileNumber
                           }
                        />
                        <NBInput
                           classVariant="loginSignup"
                           placeholder="Password"
                           value={password}
                           change={setPassword}
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
