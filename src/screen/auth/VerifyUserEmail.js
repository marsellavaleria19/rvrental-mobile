import * as React from 'react';
import Container from '../../components/Container';
import NBInputLabel from '../../components/NBInputLabel';
import {
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
   ScrollView,
} from 'react-native';
import CButton from '../../components/Button';
import {styles} from '../../assets/styles/styles';
import stylePrimary from '../../assets/styles/stylePrimary';
import {button} from '../../assets/styles/styleComponent';
import {TextArea, Box, Image, Radio, Stack, Spinner, HStack} from 'native-base';
import imageProfile from '../../assets/images/profile.png';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {validation} from '../../helpers/validation';
import {verifyEmailProcess} from '../../redux/actions/auth';
import NBModal from '../../components/NBModal';

const VerifyUserEmail = ({navigation}) => {
   const {auth} = useSelector(state => state);
   const [email, setEmail] = useState('');
   const dispatch = useDispatch();
   const [control, setControl] = useState(false);
   const [errValidation, setErrValidation] = useState({});
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   useEffect(() => {
      setEmail(auth.user?.email);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (auth.user !== null && control) {
         handleShow();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [auth.user]);

   // const showModal = () => {
   //    return (

   //    );
   // };

   const verifyUserEmailHandle = () => {
      var dataSend = {
         email,
      };
      let requirement = {
         email: 'required',
      };

      var validate = validation(dataSend, requirement);
      if (Object.keys(validate).length == 0) {
         dispatch(verifyEmailProcess(dataSend.email));
         handleShow();
      } else {
         setErrValidation(validate);
      }
   };

   return (
      <View style={styles.background}>
         <Container>
            <ScrollView>
               <View style={addStyles.layoutForm}>
                  <View style={addStyles.layoutInput}>
                     <NBInputLabel
                        placeholder={'Enter your email address'}
                        classVariant="verifyUser"
                        label="Email"
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
                  </View>
                  <View style={addStyles.layoutButton}>
                     <TouchableOpacity onPress={verifyUserEmailHandle}>
                        <CButton
                           classButton={addStyles.buttonVerify}
                           textButton={addStyles.textVerify}>
                           Send Email
                        </CButton>
                     </TouchableOpacity>
                  </View>
               </View>
               <NBModal
                  title="Verified User"
                  show={show}
                  functionShow={handleShow}
                  functionClose={handleClose}
                  functionHandle={() => navigation.navigate('VerifyUser')}
                  isButton={true}
                  buttonTitile="Next">
                  <Text>{auth?.message}</Text>
               </NBModal>
            </ScrollView>
         </Container>
      </View>
   );
};

const addStyles = StyleSheet.create({
   layoutForm: {
      marginTop: 100,
   },
   layoutInput: {
      marginBottom: 22,
   },
   label: {
      fontSize: 12,
      color: stylePrimary.mainColor,
      fontWeight: stylePrimary.bold,
      marginBottom: 10,
   },
   layoutButton: {
      marginTop: 34,
   },
   buttonVerify: {
      backgroundColor: stylePrimary.secondaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      ...button,
   },
   textVerify: {
      color: stylePrimary.mainColor,
      fontWeight: '900',
      fontSize: 18,
   },
});

export {addStyles};
export default VerifyUserEmail;
