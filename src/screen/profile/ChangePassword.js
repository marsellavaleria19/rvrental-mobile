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
   const [inputPassword, setInputPassword] = useState({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
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
      setErrValidation({});
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const verifyUserEmailHandle = () => {
      var dataSend = {
         'current password': inputPassword.currentPassword,
         'new password': inputPassword.newPassword,
         'confirm new password': inputPassword.confirmNewPassword,
      };
      let requirement = {
         'current password': 'required',
         'new password': 'required',
         'confirm new password': 'required',
      };

      var validate = validation(dataSend, requirement);
      if (Object.keys(validate).length == 0) {
         dispatch(verifyEmailProcess(dataSend.email));
         // handleShow();
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
                        placeholder={'Enter your current password'}
                        classVariant="verifyUser"
                        label="Current Password"
                        value={inputPassword.currentPassword}
                        change={newCurrentPassword =>
                           setInputPassword({
                              ...inputPassword,
                              currentPassword: newCurrentPassword,
                           })
                        }
                        secure={true}
                        isValidate={
                           Object.keys(errValidation).length > 0 && true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation['current password']
                        }
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBInputLabel
                        placeholder={'Enter your new password'}
                        classVariant="verifyUser"
                        label="New Passwoed"
                        value={inputPassword.newPassword}
                        change={newInputPassword =>
                           setInputPassword({
                              ...inputPassword,
                              newPassword: newInputPassword,
                           })
                        }
                        isValidate={
                           Object.keys(errValidation).length > 0 && true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation['new password']
                        }
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBInputLabel
                        placeholder={'Enter your confirm new password'}
                        classVariant="verifyUser"
                        label="Confirm New Passwoed"
                        value={inputPassword.confirmNewPassword}
                        change={newConfirmPassword =>
                           setInputPassword({
                              ...inputPassword,
                              confirmNewPassword: newConfirmPassword,
                           })
                        }
                        isValidate={
                           Object.keys(errValidation).length > 0 && true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation['Confirm new password']
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
