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
import {NBAlert} from '../../components/NBAlert';
import {confirmVerifyProcess} from '../../redux/actions/auth';
import NBInputLabel from '../../components/NBInputLabel';
import {validation} from '../../helpers/validation';
import {ScrollView} from 'native-base';
import NBModal from '../../components/NBModal';

const VerifyUser = ({navigation}) => {
   const {auth} = useSelector(state => state);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [code, setCode] = useState('');
   const dispatch = useDispatch();
   const [success, setSuccess] = useState(false);
   const [errValidation, setErrValidation] = useState({});
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   useEffect(() => {
      setEmail(auth?.user.email);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (auth !== null && success == true) {
         navigation.navigate('Profile');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [auth]);

   const verifyUserHandle = () => {
      var dataSend = {
         email,
         code,
         password,
      };
      let requirement = {
         email: 'required',
         code: 'required',
         password: 'required',
      };

      var validate = validation(dataSend, requirement);
      if (Object.keys(validate).length == 0) {
         dispatch(
            confirmVerifyProcess(
               dataSend.email,
               dataSend.password,
               dataSend.code,
            ),
         );
         setSuccess(true);
      } else {
         setErrValidation(validate);
      }
   };
   return (
      <View style={styles.background}>
         <Container>
            <ScrollView style={addStyles.layoutForm}>
               {auth.isError && <NBAlert>{auth.errorMessage}</NBAlert>}
               <NBInputLabel
                  placeholder={'Enter your email address'}
                  classVariant="verifyUser"
                  label="Email"
                  value={email}
                  change={setEmail}
                  isValidate={Object.keys(errValidation).length > 0 && true}
                  errorMessage={
                     Object.keys(errValidation).length > 0 &&
                     errValidation.email
                  }
               />
               <NBInputLabel
                  placeholder={'Password'}
                  classVariant="verifyUser"
                  label="Password"
                  value={password}
                  change={setPassword}
                  secure={true}
                  isValidate={Object.keys(errValidation).length > 0 && true}
                  errorMessage={
                     Object.keys(errValidation).length > 0 &&
                     errValidation.password
                  }
               />
               <NBInputLabel
                  placeholder={'Code'}
                  classVariant="verifyUser"
                  label="Code"
                  value={code}
                  change={setCode}
                  isValidate={Object.keys(errValidation).length > 0 && true}
                  errorMessage={
                     Object.keys(errValidation).length > 0 && errValidation.code
                  }
               />
               <TouchableOpacity onPress={verifyUserHandle}>
                  <CButton
                     classButton={addStyles.buttonVerifyUser}
                     textButton={addStyles.textVerifyUser}>
                     Verify Code
                  </CButton>
               </TouchableOpacity>
               <NBModal
                  title="Verified User"
                  show={show}
                  functionShow={handleShow}
                  functionClose={handleClose}
                  functionHandle={() => navigation.navigate('Profile')}
                  isButton={auth !== null && (auth.isError ? false : true)}
                  buttonTitile="Go to profile">
                  <Text>
                     {auth !== null &&
                        (auth.isError ? auth.errorMessage : auth.message)}
                  </Text>
               </NBModal>
            </ScrollView>
         </Container>
         {/* <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}>
            <Container>
               <Text style={addStyles.textTitle}>LET’S HAVE SOME RIDE</Text>
               <View style={addStyles.layoutForm}>
                  {auth.isRegister && (
                     <NBAlert status="success" message={auth.message} />
                  )}
                  {auth.isError && (
                     <NBAlert status="error" message={auth.errMessage} />
                  )}
                  <Input
                     classInput={addStyles.input}
                     placeholder="Email"
                     value={email}
                     change={setEmail}
                  />
                  <Input
                     classInput={addStyles.input}
                     placeholder="Password"
                     value={password}
                     secure={true}
                     change={setPassword}
                  />
                  <Input
                     classInput={addStyles.input}
                     placeholder="Code"
                     value={code}
                     change={setCode}
                  />
                  <TouchableOpacity onPress={verifyUserHandle}>
                     <CButton
                        classButton={addStyles.buttonVerifyUser}
                        textButton={addStyles.textVerifyUser}>
                        Verify Code
                     </CButton>
                  </TouchableOpacity>
               </View>
            </Container>
         </ImageBackground> */}
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
   text: {
      color: stylePrimary.baseFontColor,
      fontSize: 14,
      marginTop: 10,
      marginBottom: 30,
   },
   layoutForm: {
      marginTop: 50,
   },
   layoutInput: {
      marginTop: 18,
   },
   buttonVerifyUser: {
      backgroundColor: stylePrimary.secondaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
      ...button,
   },
});

export {addStyles};

export default VerifyUser;
