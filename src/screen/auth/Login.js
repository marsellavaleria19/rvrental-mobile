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
import image from '../../assets/images/backgroud-image.png';
import {useSelector, useDispatch} from 'react-redux';
import {NBAlert} from '../../components/NBAlert';
import {useState, useEffect} from 'react';
import {loginProcess} from '../../redux/actions/auth';

const Login = ({navigation}) => {
   const {auth} = useSelector(state => state);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();
   const [control, setControl] = useState(false);

   useEffect(() => {
      dispatch({
         type: 'CLEAR_AUTH',
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const loginHandle = () => {
      dispatch(loginProcess(email, password));
      setControl(true);
   };

   return (
      <View style={styles.background}>
         <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}>
            <Container>
               <Text style={addStyles.textTitle}>LET’S EXPLORE THE WORLD</Text>
               <View style={addStyles.layoutForm}>
                  {auth.isVerify && (
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
                     secure={true}
                     value={password}
                     change={setPassword}
                  />
                  <TouchableOpacity
                     onPress={() => navigation.navigate('ForgotPassword')}>
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
                     <Text style={addStyles.text}>Don’t have account?</Text>
                     <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}>
                        <Text style={addStyles.textLink}>Sign up now</Text>
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
