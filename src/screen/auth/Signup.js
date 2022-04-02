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
import {useDispatch} from 'react-redux';
import {registrationProcess} from '../../redux/actions/auth';

const Signup = ({navigation}) => {
   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
   const [name, setName] = useState('');
   const [mobileNumber, setMobileNumber] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();
   const [success, setSuccess] = useState(false);

   useEffect(() => {
      if (success) {
         navigation.navigate('VerifyUser');
      }
   }, [navigation, success]);

   const signupHandle = () => {
      dispatch(
         registrationProcess(name, username, email, password, mobileNumber),
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
               <Text style={addStyles.textTitle}>LET’S HAVE SOME RIDE</Text>
               <View style={addStyles.layoutForm}>
                  <Input
                     classInput={addStyles.input}
                     placeholder="Name"
                     secure={false}
                     value={name}
                     change={setName}
                  />
                  <Input
                     classInput={addStyles.input}
                     placeholder="Email"
                     secure={false}
                     value={email}
                     change={setEmail}
                  />
                  <Input
                     classInput={addStyles.input}
                     placeholder="Username"
                     secure={false}
                     value={username}
                     change={setUsername}
                  />

                  <Input
                     classInput={addStyles.input}
                     placeholder="Mobile phone"
                     secure={false}
                     value={mobileNumber}
                     change={setMobileNumber}
                  />
                  <Input
                     classInput={addStyles.input}
                     placeholder="Password"
                     secure={true}
                     value={password}
                     change={setPassword}
                  />
                  <TouchableOpacity onPress={signupHandle}>
                     <CButton
                        classButton={addStyles.buttonSignup}
                        textButton={addStyles.textSignup}>
                        Signup
                     </CButton>
                  </TouchableOpacity>
                  <View style={addStyles.layoutLinkLogin}>
                     <Text style={addStyles.text}>Already have account?</Text>
                     <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={addStyles.textLink}>Login now</Text>
                     </TouchableOpacity>
                  </View>
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
