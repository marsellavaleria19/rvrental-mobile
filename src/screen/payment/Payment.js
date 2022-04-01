import * as React from 'react';
import Container from '../../components/Container';
import Input from '../../components/NBInput';
import {View, StyleSheet} from 'react-native';
import CButton from '../../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../../assets/styles/styles';

const Payment = ({navigation}) => {
   return (
      <SafeAreaView>
         <Container>
            <View style={addStyles.layoutForm}>
               <Input placeholder={'ID card number'} size={16} />
               <Input placeholder={'First Name'} size={16} />
               <Input placeholder={'Last Name'} size={16} />
               <Input placeholder={'Mobile phone (must be active)'} size={16} />
               <Input placeholder={'Email address'} size={16} />
               <Input placeholder={'Location (home,office,etc)'} size={16} />
               <Input placeholder={'Payment type'} size={16} />
               <View style={addStyles.layoutButton}>
                  <CButton
                     classButton={styles.buttonPayment}
                     press={() => navigation.navigate('PaymentDetail')}
                     textButton={styles.fontButtonPayment}>
                     Send Order Details
                  </CButton>
               </View>
            </View>
         </Container>
      </SafeAreaView>
   );
};

const addStyles = StyleSheet.create({
   layoutForm: {
      marginTop: 135,
   },
   layoutButton: {
      marginTop: 34,
   },
});

export {addStyles};
export default Payment;
