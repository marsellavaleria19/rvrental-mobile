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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {updateUser} from '../../redux/actions/user';
import IconDate from 'react-native-vector-icons/Fontisto';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {validation} from '../../helpers/validation';
import NBModalSuccess from '../../components/NBModalSuccess';
import NBModalLoading from '../../components/NBModalLoading';
import NBModalError from '../../components/NBModalError';
import {FormControl, WarningOutlineIcon} from 'native-base';
import NBTextArea from '../../components/NBTextArea';
import {input} from '../../assets/styles/styleComponent';

const UpdateProfile = ({navigation}) => {
   var [inputProfile, setInputProfile] = useState({
      name: '',
      gender: '',
      email: '',
      'mobile number': '',
      address: '',
   });
   const {auth} = useSelector(state => state);
   const [birthDate, setBirthDate] = useState(new Date());
   const [picture, setPicture] = useState(imageProfile);
   const dispatch = useDispatch();
   const [control, setControl] = useState(false);
   const [image, setImage] = useState({});
   const [errValidation, setErrValidation] = useState({});
   const [showModalSuccess, setShowModalSuccess] = useState(false);
   const handleCloseModalSuccess = () => setShowModalSuccess(false);
   const [showModalError, setShowModalError] = useState(false);
   const handleCloseModalError = () => setShowModalError(false);
   const [showModalLoading, setShowModalLoading] = useState(false);
   const [messageError, setMessageError] = useState('');
   var [messageSuccess, setMessageSuccess] = useState('');

   useEffect(() => {
      Object.keys(auth.user).map(item => {
         if (auth.user !== null) {
            if (auth.user[item] !== null) {
               if (
                  item !== 'mobileNumber' &&
                  item !== 'fullName' &&
                  item !== 'birtDate'
               ) {
                  inputProfile[item] = auth.user[item];
               }

               if (item == 'mobileNumber') {
                  inputProfile['mobile number'] = auth.user[item];
               }

               if (item == 'fullName') {
                  inputProfile.name = auth.user[item];
               }
            }
            setInputProfile(inputProfile);
         }
      });
      // setName(auth.user?.fullName);
      // setEmail(auth.user?.email);
      // setMobileNumber(auth.user?.mobileNumber);
      // setAddress(auth.user?.address);
      // setGender(auth.user.gender);

      if (auth.user.photo !== null) {
         setPicture({uri: `${auth.user.photo}`});
      } else {
         setPicture(imageProfile);
      }

      if (auth.user.birthDate !== null) {
         setBirthDate(new Date(auth.user.birthDate));
      } else {
         setBirthDate(new Date());
      }
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

   const takePicture = async () => {
      const imagePicker = await launchCamera({}, async image => {
         setPicture({uri: image.assets[0].uri});
      });
      setImage(imagePicker);
   };

   const browseImage = async () => {
      const imagePicker = await launchImageLibrary({}, async image => {
         setPicture({uri: image.assets[0].uri});
      });
      setImage(imagePicker);
   };

   const updateProfileHandle = () => {
      // var data = {
      //    name: name,
      //    gender: gender,
      //    'mobile number': mobileNumber,
      //    address: address,
      //    'birth date': moment(birthDate.toISOString()).format('YYYY-MM-DD'),
      // };

      inputProfile['birth date'] = moment(birthDate.toString()).format(
         'YYYY-MM-DD',
      );
      let requirement = {
         name: 'required',
         gender: 'required',
         address: 'required',
         'mobile number': 'required',
         'birth date': 'required|date',
      };

      var validate = validation(inputProfile, requirement);
      if (Object.keys(validate).length == 0) {
         const dataSend = {
            fullName: inputProfile.name,
            gender: inputProfile.gender,
            mobileNumber: inputProfile['mobile number'],
            address: inputProfile.address,
            birthDate: inputProfile['birth date'],
         };
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
                        <TouchableOpacity onPress={takePicture}>
                           <CButton
                              classButton={addStyles.buttonImage}
                              textButton={addStyles.fontButtonImage}>
                              Take Picture
                           </CButton>
                        </TouchableOpacity>
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
                        value={inputProfile.name}
                        change={newName =>
                           setInputProfile({...inputProfile, name: newName})
                        }
                        isValidate={
                           Object.keys(errValidation).length > 0 && true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.name
                        }
                     />
                  </View>
                  <View style={addStyles.layoutRadio}>
                     <FormControl
                        isInvalid={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.gender
                        }>
                        <Radio.Group
                           name="myRadioGroup"
                           accessibilityLabel="favorite number"
                           value={inputProfile.gender}
                           onChange={newGender => {
                              setInputProfile({
                                 ...inputProfile,
                                 gender: newGender,
                              });
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
                        {Object.keys(errValidation).length > 0 &&
                           errValidation.gender && (
                              <FormControl.ErrorMessage
                                 leftIcon={<WarningOutlineIcon size="xs" />}>
                                 {errValidation.gender}
                              </FormControl.ErrorMessage>
                           )}
                     </FormControl>

                     {/* {Object.keys(errValidation).length > 0 &&
                        errValidation.gender && (
                           <FormControl.ErrorMessage
                              leftIcon={<WarningOutlineIcon size="xs" />}>
                              {errValidation.gender}
                           </FormControl.ErrorMessage>
                        )} */}
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBInputLabel
                        placeholder={'Email Address'}
                        classVariant="profile"
                        label="Email Address"
                        value={inputProfile.email}
                        change={newEmail =>
                           setInputProfile({...inputProfile, email: newEmail})
                        }
                        disabled={true}
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBInputLabel
                        placeholder={'Phone Number'}
                        classVariant="profile"
                        label="Phone Number"
                        value={inputProfile['mobile number']}
                        change={newMobileNumber =>
                           setInputProfile({
                              ...inputProfile,
                              'mobile number': newMobileNumber,
                           })
                        }
                        isValidate={
                           Object.keys(errValidation).length > 0 && true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation['mobile number']
                        }
                     />
                  </View>
                  <View style={[addStyles.layoutInput, {position: 'relative'}]}>
                     <NBInputLabel
                        classInput={addStyles.inputDate}
                        placeholder="Birthdate"
                        classVariant="profile"
                        label="Birth date"
                        value={moment(birthDate.toString()).format(
                           'YYYY-MM-DD',
                        )}
                        change={setBirthDate}
                        isValidate={
                           Object.keys(errValidation).length > 0 && true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation['birth date']
                        }
                     />
                     <TouchableOpacity onPress={showDatePicker}>
                        <IconDate name="date" style={addStyles.iconDate} />
                     </TouchableOpacity>
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBTextArea
                        label={'Delivery Address'}
                        value={inputProfile.address}
                        variant="profile"
                        valid={Object.keys(errValidation).length > 0 && true}
                        message={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.address
                        }
                        change={newAddress =>
                           setInputProfile({
                              ...inputProfile,
                              address: newAddress,
                           })
                        }
                     />
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
      marginTop: 46,
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
      marginBottom: 20,
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
