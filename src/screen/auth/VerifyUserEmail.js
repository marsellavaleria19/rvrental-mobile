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
import {verifyEmailProcess} from '../../redux/actions/auth';
import NBModalLoading from '../../components/NBModalLoading';
import NBModalSuccess from '../../components/NBModalSuccess';
import NBModalError from '../../components/NBModalError';

const VerifyUserEmail = ({navigation}) => {
   const {auth} = useSelector(state => state);
   const [email, setEmail] = useState('');
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
      setEmail(auth.user?.email);
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
         email,
      };
      let requirement = {
         email: 'required|email',
      };

      var validate = validation(dataSend, requirement);
      if (Object.keys(validate).length == 0) {
         dispatch(verifyEmailProcess(dataSend.email));
         setControl(true);
      } else {
         setErrValidation(validate);
      }
   };

   return (
      <View style={styles.background}>
         <Container>
            <ScrollView>
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
                     button={'Go to confirm verify email'}
                     functionHandle={() => navigation.navigate('VerifyUser')}
                  />
               )}
               <View style={addStyles.layoutForm}>
                  <View style={addStyles.layoutInput}>
                     <NBInputLabel
                        placeholder={'Enter your email address'}
                        classVariant="verifyUser"
                        label="Email"
                        value={email}
                        change={setEmail}
                        disabled={true}
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
