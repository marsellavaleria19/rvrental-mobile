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
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../../assets/styles/styles';
import stylePrimary from '../../assets/styles/stylePrimary';
import {TextArea, Box, Image, Radio, Stack} from 'native-base';
import imageProfile from '../../assets/images/profile.png';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

const UpdateProfile = ({navigation}) => {
   const [value, setValue] = useState('one');
   const {auth} = useSelector(state => state);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [mobileNumber, setMobileNumber] = useState('');
   const [address, setAddress] = useState('');

   useEffect(() => {
      setName(auth.user.fullName);
      setEmail(auth.user.email);
      setMobileNumber(auth.user.mobileNumber);
      setAddress(auth.user.address);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <View style={styles.background}>
         <Container>
            <ScrollView>
               <View style={addStyles.layoutImageEdit}>
                  <View>
                     <Image
                        size={100}
                        resizeMode={'contain'}
                        borderRadius={100}
                        source={
                           auth.user !== null && auth.user.photo !== null
                              ? {uri: `${auth.user.photo}`}
                              : imageProfile
                        }
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
                        value={name}
                        change={setName}
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
                        value={email}
                        change={setEmail}
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBInputLabel
                        placeholder={'Phone Number'}
                        classVariant="profile"
                        label="Phone Number"
                        value={mobileNumber}
                        change={setMobileNumber}
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <Box w="100%">
                        <Text style={addStyles.label}>Delivery Address</Text>
                        <TextArea
                           h={20}
                           placeholder="Delivery Address"
                           variant="profile"
                           value={address}
                           onChange={setAddress}
                        />
                     </Box>
                  </View>
                  <View style={addStyles.layoutButton}>
                     <CButton
                        classButton={styles.buttonPayment}
                        press={() => navigation.navigate('PaymentDetail')}
                        textButton={styles.fontButtonPayment}>
                        Save Change
                     </CButton>
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
