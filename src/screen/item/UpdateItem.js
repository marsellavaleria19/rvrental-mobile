import * as React from 'react';
import {
   Text,
   View,
   StyleSheet,
   ImageBackground,
   TouchableOpacity,
   ScrollView,
} from 'react-native';
import {styles} from '../../assets/styles/styles';
import Container from '../../components/Container';
import CButton from '../../components/Button';
import CInput from '../../components/Input';
import stylePrimary from '../../assets/styles/stylePrimary';
import IconRun from 'react-native-vector-icons/FontAwesome5';
import imageBackground from '../../assets/images/image-item.png';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Rate from '../../components/Rate';
import LinearGradient from 'react-native-linear-gradient';
import IconLeft from 'react-native-vector-icons/FontAwesome';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import {
   updateDataVehicle,
   deleteDataVehicle,
   getDetailVehicle,
} from '../../redux/actions/vehicle';
import {Select, Box} from 'native-base';
import BSelect from '../../components/BSelect';
import {launchImageLibrary} from 'react-native-image-picker';
import NBModal from '../../components/NBModal';
import NBModalError from '../../components/NBModalError';
import NBModalSuccess from '../../components/NBModalSuccess';
import NBModalLoading from '../../components/NBModalLoading';
import {validation} from '../../helpers/validation';
import NBInput from '../../components/NBInput';
import {getListLocation} from '../../redux/actions/location';
import {getListVehicleByCategory} from '../../redux/actions/vehicle';
import {LIMIT_VEHICLE, LIMIT_CATEGORY} from '@env';
import NBModalConfirmation from '../../components/NBModalConfirmation';
import {addDataLocation} from '../../redux/actions/location';

const UpdateItem = ({navigation}) => {
   const {vehicle, auth, location, category} = useSelector(state => state);
   const [inputVehicle, setInputVehicle] = useState({
      name: '',
      price: '',
      location: '',
      'is available': '',
      qty: '0',
   });
   const dispatch = useDispatch();
   const [control, setControl] = useState(false);
   const [picture, setPicture] = useState(imageBackground);
   const [image, setImage] = useState({});
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);
   const [showModalSuccess, setShowModalSuccess] = useState(false);
   const handleCloseModalSuccess = () => setShowModalSuccess(false);
   const [showModalError, setShowModalError] = useState(false);
   const handleCloseModalError = () => setShowModalError(false);
   const [showModalLoading, setShowModalLoading] = useState(false);
   const [messageError, setMessageError] = useState('');
   const [messageSuccess, setMessageSuccess] = useState('');
   const [errorValidate, setErrorValidate] = useState({});
   const [showModalLocation, setShowModalLocation] = useState(false);
   const handleCloseModalLocation = () => setShowModalLocation(false);
   const [dataLocation, setDataLocation] = useState('');
   const [messageSuccessLocationCategory, setMessageSuccessLocationCategory] =
      useState('');
   const [
      showModalSuccessLocationCategory,
      setShowModalSuccessLocationCategory,
   ] = useState(false);
   const handleCloseModalSuccessLocationCategory = () =>
      setShowModalSuccessLocationCategory(false);
   const [typeImage, setTypeImage] = useState([
      'image/jpeg',
      'image/png',
      'image/gif',
   ]);

   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => {
      dispatch({
         type: 'GET_DATA_VEHICLE',
      });
      inputVehicle.name = vehicle.dataVehicle.name;
      inputVehicle.price = `${vehicle.dataVehicle.price}`;
      inputVehicle.location = vehicle.dataVehicle.location_id;
      inputVehicle.qty = `${vehicle.dataVehicle.qty}`;
      inputVehicle['is available'] = vehicle.dataVehicle.isAvailable;
      setInputVehicle(inputVehicle);
      console.log(inputVehicle);
      setPicture(
         vehicle.dataVehicle !== null && vehicle.dataVehicle.photo !== null
            ? {uri: `${vehicle.dataVehicle.photo}`}
            : imageBackground,
      );

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      setShowModalLoading(vehicle.isLoading);
      if (vehicle.isLoading == false && control == true) {
         if (vehicle.isError) {
            setMessageError(vehicle.errMessage);
            setShowModalError(true);
         } else {
            setMessageSuccess(vehicle.message);
            setShowModalSuccess(true);
            setControl(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [vehicle.isLoading]);

   useEffect(() => {
      setShowModalLoading(location.isLoading);
      if (location.isLoading == false && control == true) {
         if (location.isError) {
            setMessageError(location.errMessage);
            setShowModalError(true);
         } else {
            setMessageSuccessLocationCategory(location.message);
            setShowModalSuccessLocationCategory(true);
            dispatch(getListLocation());
            inputVehicle.location = location.dataLocation.id;
            setInputVehicle(inputVehicle);
            setControl(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [location.isLoading]);

   const countIncrement = () => {
      inputVehicle.qty = (parseInt(inputVehicle.qty) + 1).toString();
      setInputVehicle({...inputVehicle, qty: inputVehicle.qty});
   };

   const countDecrement = () => {
      if (parseInt(inputVehicle.qty) > 0) {
         inputVehicle.qty = (parseInt(inputVehicle.qty) - 1).toString();
         setInputVehicle({...inputVehicle, qty: inputVehicle.qty});
      }
   };

   const updateItemHandle = () => {
      // var data = {
      //    name,
      //    location,
      //    price,
      //    qty: qty.toString(),
      //    isAvailable: isAvailable.toString(),
      // };
      inputVehicle.location = inputVehicle.location.toString();
      inputVehicle.qty = inputVehicle.qty.toString();
      inputVehicle['is available'] = inputVehicle['is available'].toString();
      const requirement = {
         name: 'required',
         location: 'required',
         price: 'required|number',
         qty: 'required|number|grather0',
         'is available': 'choose',
      };
      const validate = validation(inputVehicle, requirement);
      if (Object.keys(validate).length == 0) {
         if (Object.keys(image).length > 0) {
            if (image.assets[0].fileSize > 2000000) {
               validate.image = 'Image size max 2MB';
            }
         }
      }

      if (Object.keys(validate).length == 0) {
         var data = {
            name: inputVehicle.name,
            location_id: inputVehicle.location,
            price: inputVehicle.price,
            qty: inputVehicle.qty.toString(),
            isAvailable: inputVehicle['is available'].toString(),
         };
         if (Object.keys(image).length > 0) {
            dispatch(
               updateDataVehicle(
                  auth.token,
                  data,
                  vehicle.dataVehicle.id,
                  image.assets[0],
               ),
            );
         } else {
            dispatch(
               updateDataVehicle(auth.token, data, vehicle.dataVehicle.id),
            );
         }
         setControl(true);
      } else {
         setErrorValidate(validate);
      }
   };

   const getAllDataCategory = () => {
      if (category.listCategory.length > 0) {
         category.listCategory.forEach(itemCategory => {
            dispatch(
               getListVehicleByCategory(
                  itemCategory.id,
                  LIMIT_CATEGORY,
                  'home',
               ),
            );
         });
      }
   };

   const deleteItemHandle = () => {
      dispatch(deleteDataVehicle(auth.token, vehicle.dataVehicle.id));
      setControl(true);
      setShow(false);
   };

   const browseImage = async () => {
      const imagePicker = await launchImageLibrary({}, async image => {
         console.log(image);
         setPicture({uri: image.assets[0].uri});
      });
      setImage(imagePicker);
   };
   const addLocationHandle = () => {
      const data = {
         'data location': dataLocation,
      };

      const requirement = {
         'data location': 'required',
      };
      var validate = validation(data, requirement);
      if (Object.keys(validate).length == 0) {
         const locationFilter = location.listLocation.filter(item =>
            item.location.toLowerCase().includes(dataLocation.toLowerCase()),
         );
         if (locationFilter.length > 0) {
            validate = {
               ...validate,
               'data location': 'Location has already used',
            };
         }
      }

      if (Object.keys(validate).length == 0) {
         dispatch(addDataLocation(auth.token, dataLocation));
         setControl(true);
         setInputVehicle({...inputVehicle, location: dataLocation.id});
         // setCategoryId(dataCategory.id);
         setShowModalLocation(false);
         setDataLocation(null);
         setErrorValidate({});
      } else {
         setErrorValidate(validate);
      }
   };

   const goToDetailCategory = () => {
      console.log(vehicle.dataVehicle.category_id);
      dispatch(
         getListVehicleByCategory(
            vehicle.dataVehicle.category_id,
            LIMIT_VEHICLE,
            'category',
         ),
      );
      category.listCategory.length > 0 &&
         category.listCategory.forEach(itemCategory => {
            dispatch(
               getListVehicleByCategory(
                  itemCategory.id,
                  LIMIT_CATEGORY,
                  'home',
               ),
            );
         });

      if (vehicle.listVehicle.length > 0) {
         navigation.navigate('DetailCategory', {
            categoryId: vehicle.dataVehicle.category_id,
         });
      } else {
         navigation.navigate('Home');
      }
   };

   return (
      <View style={styles.background}>
         <ScrollView>
            <View>
               <ImageBackground
                  source={picture}
                  resizeMode="cover"
                  style={addStyles.imageBackground}>
                  <Container>
                     <View style={addStyles.layoutBar}>
                        <TouchableOpacity
                           onPress={() => navigation.goBack()}
                           style={addStyles.layoutBack}>
                           <IconLeft
                              name="chevron-left"
                              style={addStyles.iconBack}
                           />
                        </TouchableOpacity>
                        <View style={addStyles.layoutUploadRate}>
                           <TouchableOpacity onPress={browseImage}>
                              <View style={addStyles.buttonUpload}>
                                 <IconFeather
                                    name="upload"
                                    style={addStyles.iconUpload}
                                 />
                              </View>
                           </TouchableOpacity>
                           <View style={addStyles.flexRow}>
                              <Rate rate={vehicle.dataVehicle.rate} />
                           </View>
                        </View>
                     </View>
                  </Container>
               </ImageBackground>
            </View>
            <Container>
               <Text style={addStyles.textErrorImage}>
                  {Object.keys(image).length > 0 &&
                     image.assets[0].fileSize > 2000000 &&
                     'Photo max 2 MB'}
                  {Object.keys(image).length > 0 &&
                     !typeImage.includes(image.assets[0].type) &&
                     'Image type must be .jpg/.png/.gif '}
               </Text>
               <View style={addStyles.marginLayout}>
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
                        button={'Go to detail category'}
                        functionHandle={goToDetailCategory}
                     />
                  )}
                  {messageSuccessLocationCategory !== '' && (
                     <NBModalSuccess
                        show={showModalSuccessLocationCategory}
                        message={messageSuccessLocationCategory}
                        close={handleCloseModalSuccessLocationCategory}
                     />
                  )}
                  <View style={addStyles.layoutDescriptionRate}>
                     <View>
                        <CInput
                           classInput={addStyles.title}
                           value={inputVehicle.name}
                           change={newName =>
                              setInputVehicle({...inputVehicle, name: newName})
                           }
                           placeholder="Name"
                           placeholderTextColor={stylePrimary.secondaryColor}
                           error={errorValidate.name && errorValidate.name}
                        />
                        <CInput
                           classInput={addStyles.price}
                           value={inputVehicle.price}
                           change={newPrice =>
                              setInputVehicle({
                                 ...inputVehicle,
                                 price: newPrice,
                              })
                           }
                           placeholder="Price"
                           placeholderTextColor={stylePrimary.secondaryColor}
                           error={errorValidate.price && errorValidate.price}
                        />
                     </View>
                     <View>
                        <TouchableOpacity onPress={handleShow}>
                           <View style={addStyles.layoutDelete}>
                              <IconFontAwesome
                                 name="trash-o"
                                 style={addStyles.iconDelete}
                              />
                           </View>
                        </TouchableOpacity>
                        <NBModalConfirmation
                           show={show}
                           functionClose={handleClose}
                           close={handleClose}
                           button={'Delete'}
                           isButtonCancel={true}
                           functionHandle={deleteItemHandle}
                           message={
                              'Do you really want to delete this data? This data cannot restore.'
                           }
                        />
                     </View>
                  </View>
                  <View style={addStyles.layoutDescription}>
                     <Text style={addStyles.description}>Max for 2 person</Text>
                     <Text style={addStyles.description}>No prepayment</Text>
                     <Text
                        style={
                           inputVehicle['is available'] == 1
                              ? styles.statusAvailable
                              : styles.statusNotAvailable
                        }>
                        {inputVehicle['is available'] == 1
                           ? 'Available '
                           : 'Full Booked'}
                     </Text>
                     <View style={addStyles.layoutLocation}>
                        <LinearGradient
                           colors={[stylePrimary.secondaryColor, '#7796b6']}
                           style={[addStyles.layoutIconLocation]}>
                           <IconMaterial
                              name="location-on"
                              style={addStyles.iconLocation}
                           />
                        </LinearGradient>
                        {/* <CInput
                           classInput={addStyles.fontLocation}
                           value={inputVehicle.location}
                           change={setLocation}
                        /> */}
                        <BSelect
                           width="100%"
                           placeholder="Location"
                           variantSelect="updateItem"
                           isInvalid={
                              Object.keys(errorValidate).length > 0 && true
                           }
                           errMessage={
                              Object.keys(errorValidate).length > 0 &&
                              errorValidate.location
                           }
                           selected={inputVehicle.location}
                           value={inputVehicle.location}
                           change={itemValue =>
                              setInputVehicle({
                                 ...inputVehicle,
                                 location: itemValue,
                              })
                           }>
                           {location.listLocation.length > 0 &&
                              location.listLocation.map(item => {
                                 return (
                                    <Select.Item
                                       key={item.id}
                                       label={item.location}
                                       value={item.id}
                                       variant={'item'}
                                    />
                                 );
                              })}
                           <Select.Item
                              label="+ Add Location"
                              value={0}
                              onPress={() => setShowModalLocation(true)}
                           />
                        </BSelect>
                        <NBModal
                           title="Location"
                           show={showModalLocation}
                           functionClose={handleCloseModalLocation}
                           functionHandle={addLocationHandle}
                           isButtonCancel={true}
                           button="Save">
                           <NBInput
                              placeholder={'Type Location'}
                              classVariant="item"
                              value={dataLocation}
                              isValidate={
                                 Object.keys(errorValidate).length > 0 && true
                              }
                              errorMessage={
                                 Object.keys(errorValidate).length > 0 &&
                                 errorValidate['data location']
                              }
                              change={setDataLocation}
                           />
                        </NBModal>
                     </View>
                     <View style={addStyles.layoutDistance}>
                        <LinearGradient
                           colors={[stylePrimary.secondaryColor, '#7796b6']}
                           style={[addStyles.layoutIconLocation]}>
                           <IconRun
                              name="running"
                              style={addStyles.iconLocation}
                           />
                        </LinearGradient>
                        <Text style={addStyles.fontLocation}>
                           3.2 miles from your location
                        </Text>
                     </View>
                     <View style={addStyles.layoutQtyBikes}>
                        <Text style={addStyles.fontLabel}>Stock</Text>
                        <View style={addStyles.layoutQty}>
                           <TouchableOpacity onPress={countDecrement}>
                              <CButton
                                 classButton={addStyles.button}
                                 textButton={addStyles.text}>
                                 -
                              </CButton>
                           </TouchableOpacity>
                           <CInput
                              style={addStyles.inputQty}
                              value={inputVehicle.qty}
                              change={newQty => {
                                 setInputVehicle({
                                    ...inputVehicle,
                                    qty: newQty,
                                 });
                              }}
                           />
                           <TouchableOpacity onPress={countIncrement}>
                              <CButton
                                 classButton={addStyles.button}
                                 textButton={addStyles.text}>
                                 +
                              </CButton>
                           </TouchableOpacity>
                        </View>
                     </View>
                     <View style={addStyles.layoutStatusStock}>
                        <Box w="100%">
                           <BSelect
                              width="100%"
                              placeholder="Update stock status"
                              variantSelect="reservation"
                              change={itemValue =>
                                 setInputVehicle({
                                    ...inputVehicle,
                                    'is available': itemValue,
                                 })
                              }>
                              <Select.Item label="Available" value={1} />
                              <Select.Item label="Full Booked" value={0} />
                           </BSelect>
                        </Box>
                     </View>
                  </View>
               </View>
               <View style={addStyles.layoutButton}>
                  <TouchableOpacity onPress={updateItemHandle}>
                     <CButton
                        classButton={addStyles.buttonReservation}
                        textButton={addStyles.fontButtonReservation}>
                        Update Item
                     </CButton>
                  </TouchableOpacity>
               </View>
            </Container>
         </ScrollView>
      </View>
   );
};

const addStyles = StyleSheet.create({
   imageBackground: {
      height: 300,
   },
   layoutBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 40,
   },
   layoutUploadRate: {
      flexDirection: 'row',
   },
   buttonUpload: {
      fontWeight: '700',
      fontSize: 30,
      width: 35,
      height: 35,
      borderRadius: 20,
      backgroundColor: stylePrimary.secondaryColor,
      marginRight: 5,
   },
   iconUpload: {
      fontWeight: '700',
      fontSize: 20,
      alignSelf: 'center',
      color: stylePrimary.mainColor,
      marginTop: 5,
   },
   iconBack: {
      color: stylePrimary.mainColor,
      fontSize: 22,
      marginLeft: 20,
   },
   layoutDelete: {
      fontWeight: '700',
      fontSize: 30,
      marginLeft: 10,
      width: 35,
      height: 35,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: stylePrimary.secondaryColor,
   },
   iconDelete: {
      fontWeight: '700',
      fontSize: 20,
      marginTop: 5,
      alignSelf: 'center',
      color: stylePrimary.mainColor,
   },
   layoutDescriptionRate: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   iconLocation: {
      color: stylePrimary.mainColor,
      fontSize: 20,
   },
   flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   title: {
      fontSize: 24,
      fontWeight: '700',
      color: stylePrimary.mainColor,
   },
   price: {
      fontSize: 24,
      fontWeight: '700',
      color: stylePrimary.mainColor,
   },
   marginLayout: {
      marginTop: 12,
   },
   layoutDescription: {
      marginTop: 14,
   },
   description: {
      fontSize: 16,
   },
   layoutIconLocation: {
      width: 38,
      height: 38,
      borderRadius: 5,
      padding: 7,
   },
   layoutLocation: {
      marginTop: 30,
      flexDirection: 'row',
      alignItems: 'center',
   },
   layoutDistance: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
   },
   fontLocation: {
      fontSize: 16,
      color: 'gray',
      marginStart: 10,
   },
   layoutQtyBikes: {
      marginTop: 32,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   layoutQty: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   fontLabel: {
      fontWeight: '700',
      fontSize: 16,
      marginRight: 80,
   },
   button: {
      backgroundColor: stylePrimary.secondaryColor,
      width: 21,
      height: 21,
      borderRadius: 20,
   },
   text: {
      color: stylePrimary.mainColor,
      fontSize: 15,
      fontWeight: '900',
      textAlign: 'center',
   },
   inputQty: {
      width: 50,
      color: stylePrimary.mainColor,
      textAlign: 'center',
      fontSize: 15,
      fontWeight: '700',
   },
   layoutStatusStock: {
      marginTop: 28,
   },
   layoutButton: {
      marginTop: 26,
   },
   buttonReservation: {
      backgroundColor: stylePrimary.secondaryColor,
      marginTop: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 66,
      borderRadius: 10,
   },
   fontButtonReservation: {
      fontSize: 24,
      color: stylePrimary.mainColor,
      fontWeight: '700',
   },
   textErrorImage: {
      fontSize: 12,
      color: 'red',
      textAlign: 'center',
   },
});

export {addStyles};

export default UpdateItem;
