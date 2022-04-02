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
import {verifyProcess} from '../../redux/actions/auth';

const VerifyUser = ({navigation}) => {
   const {auth} = useSelector(state => state);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [code, setCode] = useState('');
   const dispatch = useDispatch();
   const [success, setSuccess] = useState(false);

   useEffect(() => {
      if (success) {
         navigation.navigate('Login');
      }
   }, [navigation, success]);

   const verifyUserHandle = () => {
      dispatch(verifyProcess(email, password, code));
      setSuccess(true);
   };
   return (
      <View style={styles.background}>
         <ImageBackground
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
   buttonVerifyUser: {
      backgroundColor: stylePrimary.secondaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
      ...button,
   },
   textVerifyUser: {
      color: stylePrimary.mainColor,
      fontWeight: '900',
      fontSize: 18,
   },
});

export {addStyles};

export default VerifyUser;
