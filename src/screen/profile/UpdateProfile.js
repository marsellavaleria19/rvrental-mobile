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
import {TextArea, Box, Image, Radio, Stack, Spinner, HStack} from 'native-base';
import imageProfile from '../../assets/images/profile.png';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {updateUser, uploadImageUser} from '../../redux/actions/user';
import {NBAlert} from '../../components/NBAlert';
import IconDate from 'react-native-vector-icons/Fontisto';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {validation} from '../../helpers/validation';
import {getDataUser} from '../../redux/actions/auth';
import NBModal from '../../components/NBModal';

const UpdateProfile = ({navigation}) => {
   const {auth} = useSelector(state => state);
   const [name, setName] = useState('');
   const [gender, setGender] = useState('');
   const [email, setEmail] = useState('');
   const [mobileNumber, setMobileNumber] = useState('');
   const [birthDate, setBirthDate] = useState(new Date());
   const [address, setAddress] = useState('');
   const [picture, setPicture] = useState(imageProfile);
   const [upload, setUpload] = useState(false);
   const dispatch = useDispatch();
   const [control, setControl] = useState(false);
   const [image, setImage] = useState({});
   const [errValidation, setErrValidation] = useState({});
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   useEffect(() => {
      setName(auth.user?.fullName);
      setEmail(auth.user?.email);
      setMobileNumber(auth.user?.mobileNumber);
      setAddress(auth.user?.address);
      setGender(auth.user.gender);
      setPicture(
         auth.user?.photo !== null
            ? {uri: `${auth.user?.photo}`}
            : imageProfile,
      );
      setUpload(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (auth.user !== null && control) {
         navigation.navigate('Profile');
         // dispatch(getDataUser(auth.token));
         // setName(auth.user?.fullName);
         // setEmail(auth.user?.email);
         // setMobileNumber(auth.user?.mobileNumber);
         // setAddress(auth.user?.address);
         // setPicture({uri: `${auth.user?.photo}`});
         // setControl(false);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [auth.user]);

   const onChange = (event, selectedDate) => {
      setBirthDate(selectedDate);
   };

   const showDatePicker = () => {
      DateTimePickerAndroid.open({
         value: birthDate,
         onChange,
         mode: 'date',
         is24Hour: true,
      });
   };

   const browseImage = async () => {
      const imagePicker = await launchImageLibrary({}, async image => {
         setPicture({uri: image.assets[0].uri});
      });
      setImage(imagePicker);
   };

   const updateProfileHandle = () => {
      var dataSend = {
         fullName: name,
         gender: gender,
         mobileNumber: mobileNumber,
         address: address,
         birthDate: moment(birthDate.toLocaleString()).format('YYYY-MM-DD'),
      };
      let requirement = {
         fullName: 'required',
         gender: 'required',
         mobileNumber: 'required',
         birthDate: 'required',
      };

      var validate = validation(dataSend, requirement);
      if (Object.keys(validate).length == 0) {
         if (Object.keys(image).length > 0) {
            dispatch(
               updateUser(auth.token, auth.user.id, dataSend, image.assets[0]),
            );
         } else {
            dispatch(updateUser(auth.token, auth.user.id, dataSend));
         }
         setControl(true);
      } else {
         setErrValidation(validate);
      }
   };

   return (
      <View style={styles.background}>
         <Container>
            <ScrollView>
               {/* <View style={addStyles.layoutImageEdit}>
                  {!upload ? (
                     <Image
                        size={100}
                        resizeMode={'contain'}
                        borderRadius={100}
                        source={imageProfile}
                        alt="Profile"
                     />
                  ) : (
                     <View style={addStyles.layoutLoading}>
                        <View style={addStyles.spinner}>
                           <Spinner size="lg" color="white" />
                        </View>
                     </View>
                  )}
               </View> */}
               <View>
                  <View style={addStyles.layoutImageEdit}>
                     <Image
                        size={100}
                        resizeMode={'contain'}
                        borderRadius={100}
                        source={picture}
                        alt="Profile"
                     />
                     <View style={addStyles.layoutButtonImage}>
                        <CButton
                           classButton={addStyles.buttonImage}
                           press={() => navigation.navigate('PaymentDetail')}
                           textButton={addStyles.fontButtonImage}>
                           Take Picture
                        </CButton>
                        <TouchableOpacity onPress={browseImage}>
                           <CButton
                              classButton={addStyles.buttonGallery}
                              textButton={addStyles.fontButtonGallery}>
                              Browse From Gallery
                           </CButton>
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>
               <View style={addStyles.layoutForm}>
                  <Text style={addStyles.textErrorImage}>
                     {Object.keys(image).length > 0 &&
                        image.assets[0].fileSize > 2000000 &&
                        'Photo max 2 MB'}
                  </Text>
                  <View style={addStyles.layoutInput}>
                     <NBInputLabel
                        placeholder={'Name'}
                        classVariant="profile"
                        label="Name"
                        value={name}
                        change={setName}
                        isValidate={
                           Object.keys(errValidation).length > 0 && true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.fullName
                        }
                     />
                  </View>
                  <View style={addStyles.layoutRadio}>
                     <Radio.Group
                        name="myRadioGroup"
                        accessibilityLabel="favorite number"
                        value={gender}
                        onChange={nextValue => {
                           setGender(nextValue);
                        }}>
                        <Stack
                           direction={{
                              base: 'row',
                           }}
                           alignItems="center"
                           space={50}
                           w="100%"
                           maxW="100%">
                           <Radio value="Female" size="sm" my={1}>
                              Female
                           </Radio>
                           <Radio value="Male" size="sm" my={1}>
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
                        disabled={true}
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBInputLabel
                        placeholder={'Phone Number'}
                        classVariant="profile"
                        label="Phone Number"
                        value={mobileNumber}
                        change={setMobileNumber}
                        isValidate={
                           Object.keys(errValidation).length > 0 && true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.mobileNumber
                        }
                     />
                  </View>
                  <View style={[addStyles.layoutInput, {position: 'relative'}]}>
                     <NBInputLabel
                        classInput={addStyles.inputDate}
                        placeholder="Birthdate"
                        classVariant="profile"
                        label="Birth date"
                        value={moment(birthDate.toLocaleString()).format(
                           'YYYY-MM-DD',
                        )}
                        change={setBirthDate}
                        isValidate={
                           Object.keys(errValidation).length > 0 && true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.birthdate
                        }
                     />
                     <TouchableOpacity onPress={showDatePicker}>
                        <IconDate name="date" style={addStyles.iconDate} />
                     </TouchableOpacity>
                  </View>
                  <View style={addStyles.layoutInput}>
                     <Box w="100%">
                        <Text style={addStyles.label}>Delivery Address</Text>
                        <TextArea
                           h={20}
                           placeholder="Delivery Address"
                           variant="profile"
                           value={address}
                           onChangeText={setAddress}
                        />
                     </Box>
                  </View>
                  <View style={addStyles.layoutButton}>
                     <TouchableOpacity onPress={updateProfileHandle}>
                        <CButton
                           classButton={styles.buttonPayment}
                           textButton={styles.fontButtonPayment}>
                           Save Change
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
   layoutLoading: {
      backgroundColor: 'gray',
      width: 100,
      height: 100,
      borderRadius: 100,
   },
   spinner: {
      marginTop: 30,
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
   textErrorImage: {
      color: 'red',
      marginBottom: 20,
   },
});

export {addStyles};
export default UpdateProfile;
