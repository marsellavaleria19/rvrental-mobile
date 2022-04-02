import * as React from 'react';
import Container from '../../components/Container';
import NBInputLabel from '../../components/NBInputLabel';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import CButton from '../../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../../assets/styles/styles';
import CInput from '../../components/Input';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {useState} from 'react';
import IconDate from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import stylePrimary from '../../assets/styles/stylePrimary';
import {TextArea, Box, Image, Radio, Stack} from 'native-base';
import imageProfile from '../../assets/images/avat-1.png';
import NBRadio from '../../components/BNRadio';
import IconEdit from 'react-native-vector-icons/FontAwesome';

const UpdateProfile = ({navigation}) => {
   const [value, setValue] = React.useState('one');
   return (
      <View>
         <Container>
            <View style={addStyles.layoutImageEdit}>
               <View>
                  <Image
                     size={100}
                     resizeMode={'contain'}
                     borderRadius={100}
                     source={imageProfile}
                     alt="Profile"
                  />
               </View>
               <View style={addStyles.layoutButtonImage}>
                  <CButton
                     classButton={addStyles.buttonImage}
                     press={() => navigation.navigate('PaymentDetail')}
                     textButton={addStyles.fontButtonImage}>
                     Take Picture
                  </CButton>
                  <CButton
                     classButton={addStyles.buttonGallery}
                     press={() => navigation.navigate('PaymentDetail')}
                     textButton={addStyles.fontButtonGallery}>
                     Browse From Gallery
                  </CButton>
               </View>
            </View>
            <View style={addStyles.layoutForm}>
               <View style={addStyles.layoutInput}>
                  <NBInputLabel
                     placeholder={'Name'}
                     classVariant="profile"
                     label="Name"
                  />
               </View>
               <View style={addStyles.layoutRadio}>
                  <Radio.Group
                     name="myRadioGroup"
                     accessibilityLabel="favorite number"
                     value={value}
                     onChange={nextValue => {
                        setValue(nextValue);
                     }}>
                     <Stack
                        direction={{
                           base: 'row',
                        }}
                        alignItems="center"
                        space={50}
                        w="100%"
                        maxW="100%">
                        <Radio value="one" size="sm" my={1}>
                           Female
                        </Radio>
                        <Radio value="two" size="sm" my={1}>
                           Male
                        </Radio>
                     </Stack>
                  </Radio.Group>
               </View>
               <View style={addStyles.layoutInput}>
                  <NBInputLabel
                     placeholder={'Email Address'}
                     classVariant="profile"
                     label="Email Address"
                  />
               </View>
               <View style={addStyles.layoutInput}>
                  <NBInputLabel
                     placeholder={'Phone Number'}
                     classVariant="profile"
                     label="Phone Number"
                  />
               </View>
               <View style={addStyles.layoutInput}>
                  <Box w="100%">
                     <Text style={addStyles.label}>Delivery Address</Text>
                     <TextArea
                        h={20}
                        placeholder="Delivery Address"
                        variant="profile"
                     />
                  </Box>
               </View>
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
      </View>
   );
};

const addStyles = StyleSheet.create({
   layoutForm: {
      marginTop: 100,
   },
   layoutRadio: {
      flexDirection: 'row',
      marginBottom: 22,
      paddingHorizontal: 5,
   },
   layoutInput: {
      marginBottom: 22,
   },
   layoutImageEdit: {
      alignItems: 'center',
      top: 40,
      justifyContent: 'center',
      flexDirection: 'row',
   },
   layoutIconEdit: {
      position: 'absolute',
      backgroundColor: stylePrimary.secondaryColor,
      borderRadius: 20,
      width: 35,
      height: 35,
      alignItems: 'center',
      bottom: 0,
      right: 0,
   },
   iconEdit: {
      color: 'black',
      fontSize: 18,
      top: 7,
   },
   iconDate: {
      color: 'black',
      fontSize: 22,
      position: 'absolute',
      bottom: 15,
      right: 20,
   },
   label: {
      fontSize: 12,
      color: '#B8B8B8',
      fontWeight: stylePrimary.bold,
      marginBottom: 10,
   },
   inputDate: {
      backgroundColor: 'white',
      // opacity: 0.1,
      borderRadius: 10,
      width: '100%',
      height: 50,
      paddingLeft: 10,
      marginRight: 10,
   },
   layoutButton: {
      marginTop: 34,
   },
   layoutButtonImage: {
      marginLeft: 20,
      width: '50%',
   },
   buttonImage: {
      height: 38,
      backgroundColor: stylePrimary.mainColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      borderRadius: 10,
   },
   fontButtonImage: {
      fontSize: 13,
      fontWeight: stylePrimary.bold,
      color: stylePrimary.secondaryColor,
   },
   buttonGallery: {
      height: 38,
      backgroundColor: stylePrimary.secondaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
   },
   fontButtonGallery: {
      fontSize: 13,
      color: stylePrimary.mainColor,
   },
});

export {addStyles};
export default UpdateProfile;
