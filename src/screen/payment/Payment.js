import * as React from 'react';
import Container from '../../components/Container';
import NBInput from '../../components/NBInput';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CButton from '../../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../../assets/styles/styles';
import {useState, useEffect} from 'react';
import BSelect from '../../components/BSelect';
import {useDispatch, useSelector} from 'react-redux';
import {saveDataPayment} from '../../redux/actions/payment';
import {ScrollView, Select} from 'native-base';
import {validation} from '../../helpers/validation';
import StepperPayment from '../../components/StepperPayment';

const Payment = ({navigation}) => {
   const {reservation, payment, auth} = useSelector(state => state);
   const [errValidation, setErrValidation] = useState({});
   const [inputPayment, setInputPayment] = useState({
      'id card': '',
      firstname: auth.user.fullName,
      lastname: '',
      'mobile number': auth.user.mobileNumber,
      email: auth.user.email,
      location: '',
      'payment type': '',
   });
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
      inputPayment['payment type'] = inputPayment['payment type'].toString();
      let requirement = {
         'id card': 'required|number',
         firstname: 'required',
         lastname: 'required',
         'mobile number': 'required|phone',
         email: 'required|email',
         location: 'required',
         'payment type': 'choose',
      };
      const paymentResult = payment.listPaymentType.filter(
         item => item.id == inputPayment['payment type'],
      );
      var validate = validation(inputPayment, requirement);
      if (Object.keys(validate).length == 0) {
         dispatch(saveDataPayment(inputPayment, paymentResult[0]));
         setControl(true);
      } else {
         setErrValidation(validate);
      }
   };

   return (
      <View style={styles.background}>
         <ScrollView>
            <Container>
               <View style={addStyles.layoutStepper}>
                  <StepperPayment active={1} count={3} />
               </View>
               <View style={addStyles.layoutForm}>
                  <View style={addStyles.layoutInput}>
                     <NBInput
                        classVariant="payment"
                        placeholder="ID Card number"
                        value={inputPayment['id card']}
                        change={newIdCard =>
                           setInputPayment({
                              ...inputPayment,
                              'id card': newIdCard,
                           })
                        }
                        isValidate={
                           Object.keys(errValidation).length > 0 &&
                           errValidation['id card'] &&
                           true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation['id card']
                        }
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBInput
                        placeholder={'First Name'}
                        classVariant="payment"
                        value={inputPayment.firstname}
                        change={newFirstName =>
                           setInputPayment({
                              ...inputPayment,
                              firstname: newFirstName,
                           })
                        }
                        isValidate={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.firstname &&
                           true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.firstname
                        }
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBInput
                        placeholder={'Last Name'}
                        value={inputPayment.lastname}
                        change={newLastname =>
                           setInputPayment({
                              ...inputPayment,
                              lastname: newLastname,
                           })
                        }
                        classVariant="payment"
                        isValidate={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.lastname &&
                           true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.lastname
                        }
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBInput
                        placeholder={'Mobile phone (must be active)'}
                        classVariant="payment"
                        value={inputPayment['mobile number']}
                        change={newMobileNumber =>
                           setInputPayment({
                              ...inputPayment,
                              'mobile number': newMobileNumber,
                           })
                        }
                        isValidate={
                           Object.keys(errValidation).length > 0 &&
                           errValidation['mobile number'] &&
                           true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation['mobile number']
                        }
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBInput
                        placeholder={'Email address'}
                        value={inputPayment.email}
                        change={newEmail =>
                           setInputPayment({...inputPayment, email: newEmail})
                        }
                        classVariant="payment"
                        isValidate={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.email &&
                           true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.email
                        }
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBInput
                        placeholder={'Location (home,office,etc)'}
                        value={inputPayment.location}
                        change={newLocation =>
                           setInputPayment({
                              ...inputPayment,
                              location: newLocation,
                           })
                        }
                        classVariant="payment"
                        isValidate={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.location &&
                           true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.location
                        }
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <BSelect
                        width="100%"
                        variantSelect={'reservation'}
                        placeholder="Payment Type"
                        value={inputPayment['payment type']}
                        change={itemValue =>
                           setInputPayment({
                              ...inputPayment,
                              'payment type': itemValue,
                           })
                        }
                        isInvalid={
                           Object.keys(errValidation).length > 0 &&
                           errValidation['payment type'] &&
                           true
                        }
                        errMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation['payment type']
                        }>
                        {payment.listPaymentType.length > 0 &&
                           payment.listPaymentType.map(item => {
                              return (
                                 <Select.Item
                                    label={item.payment}
                                    value={item.id}
                                 />
                              );
                           })}
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
      marginTop: 50,
   },
   layoutStepper: {
      marginTop: 50,
   },
   layoutInput: {
      marginTop: 10,
   },
   layoutButton: {
      marginTop: 34,
      marginBottom: 20,
   },
});

export {addStyles};
export default Payment;
