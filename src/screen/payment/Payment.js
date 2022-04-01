import * as React from 'react';
import Container from '../../components/Container';
import Input from '../../components/NBInput';
import {View, StyleSheet} from 'react-native';
import NBButton from '../../components/NBButton';

const Payment = () => {
   return (
      <View>
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
                  <NBButton>Send Order Details </NBButton>
               </View>
            </View>
         </Container>
      </View>
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
