import * as React from 'react';
import Container from '../../components/Container';
import NBInputLabel from '../../components/NBInputLabel';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import CButton from '../../components/Button';
import {styles} from '../../assets/styles/styles';
import stylePrimary from '../../assets/styles/stylePrimary';
import {button} from '../../assets/styles/styleComponent';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {validation} from '../../helpers/validation';
import NBModalLoading from '../../components/NBModalLoading';
import NBModalSuccess from '../../components/NBModalSuccess';
import NBModalError from '../../components/NBModalError';
import {changePassword} from '../../redux/actions/auth';

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
         if (inputPassword.newPassword == inputPassword.confirmNewPassword) {
            dispatch(changePassword(auth.token, inputPassword));
            setControl(true);
         } else {
            setMessageError('New Password and confirm new password not match');
            setShowModalError(true);
         }
      } else {
         setErrValidation(validate);
      }
   };

   return (
      <View style={styles.background}>
         <Container>
            <ScrollView>
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
                        button={'Go to profile menu'}
                        functionHandle={() => navigation.navigate('Profile')}
                     />
                  )}
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
                        label="New Password"
                        secure={true}
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
                        label="Confirm New Password"
                        secure={true}
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
                           errValidation['confirm new password']
                        }
                     />
                  </View>
                  <View style={addStyles.layoutButton}>
                     <TouchableOpacity onPress={verifyUserEmailHandle}>
                        <CButton
                           classButton={addStyles.buttonVerify}
                           textButton={addStyles.textVerify}>
                           Change Password
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
      marginTop: 30,
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
      marginTop: 20,
      marginBottom: 10,
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
