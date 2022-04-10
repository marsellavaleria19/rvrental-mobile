import * as React from 'react';
import Container from '../../components/Container';
import Input from '../../components/NBInput';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CButton from '../../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../../assets/styles/styles';
import {useState, useEffect} from 'react';
import BSelect from '../../components/BSelect';
import {useDispatch, useSelector} from 'react-redux';
import {saveDataPayment} from '../../redux/actions/payment';
import {ScrollView} from 'native-base';

const Payment = ({navigation}) => {
   const {reservation, payment, auth} = useSelector(state => state);
   const [errValidation, setErrValidation] = useState({});
   const [idCard, setIdCard] = useState('');
   const [firstname, setFirstname] = useState('');
   const [lastname, setLastname] = useState('');
   const [mobileNumber, setMobileNumber] = useState('');
   const [email, setEmail] = useState('');
   const [location, setLocation] = useState('');
   const [paymentType, setPaymentType] = useState('');
   const [control, setControl] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      if (payment.dataPayment !== null && control) {
         navigation.navigate('PaymentDetail');
      }
      // if (payment.dataPayment !== null && control) {
      //    navigation.navigate('PaymentDetail', {
      //       idHistory: payment.dataPayment.id,
      //    });
      // }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [payment.dataPayment]);

   const paymentHandle = () => {
      const data = {
         idCard: idCard,
         firstname: firstname,
         lastname: lastname,
         mobileNumber: mobileNumber,
         email: email,
         location: location,
         paymentType: paymentType,
      };
      dispatch(saveDataPayment(data));
      setControl(true);
   };

   return (
      <View style={styles.background}>
         <ScrollView>
            <Container>
               <View style={addStyles.layoutForm}>
                  <Input
                     classVariant="loginSignup"
                     placeholder="ID Card number"
                     value={idCard}
                     change={setIdCard}
                     isValidate={Object.keys(errValidation).length > 0 && true}
                     errorMessage={
                        Object.keys(errValidation).length > 0 &&
                        errValidation.idCard
                     }
                  />
                  <Input
                     placeholder={'First Name'}
                     size={16}
                     classVariant="payment"
                     value={firstname}
                     change={setFirstname}
                     isValidate={Object.keys(errValidation).length > 0 && true}
                     errorMessage={
                        Object.keys(errValidation).length > 0 &&
                        errValidation.idCard
                     }
                  />
                  <Input
                     placeholder={'Last Name'}
                     size={16}
                     value={lastname}
                     change={setLastname}
                     isValidate={Object.keys(errValidation).length > 0 && true}
                     errorMessage={
                        Object.keys(errValidation).length > 0 &&
                        errValidation.idCard
                     }
                  />
                  <Input
                     placeholder={'Mobile phone (must be active)'}
                     size={16}
                     value={mobileNumber}
                     change={setMobileNumber}
                  />
                  <Input
                     placeholder={'Email address'}
                     size={16}
                     value={email}
                     change={setEmail}
                  />
                  <Input
                     placeholder={'Location (home,office,etc)'}
                     size={16}
                     value={location}
                     change={setLocation}
                  />
                  <View style={addStyles.layoutInput}>
                     <BSelect
                        width="100%"
                        placeholder="Payment Type"
                        variant="reservation"
                        select={paymentType}
                        change={itemValue => setPaymentType(itemValue)}>
                        <BSelect.Item label="Prepayment" value={'Prepayment'} />
                        <BSelect.Item
                           label="Payment at end"
                           value={'Payment at end'}
                        />
                        <BSelect.Item
                           label="Partial payment"
                           value={'Partial payment'}
                        />
                     </BSelect>
                  </View>
                  <View style={addStyles.layoutButton}>
                     <TouchableOpacity onPress={paymentHandle}>
                        <CButton
                           classButton={styles.buttonPayment}
                           textButton={styles.fontButtonPayment}>
                           Send Order Details
                        </CButton>
                     </TouchableOpacity>
                  </View>
               </View>
            </Container>
         </ScrollView>
      </View>
   );
};

const addStyles = StyleSheet.create({
   layoutForm: {
      marginTop: 135,
   },
   layoutInput: {
      marginTop: 10,
   },
   layoutButton: {
      marginTop: 34,
   },
});

export {addStyles};
export default Payment;
