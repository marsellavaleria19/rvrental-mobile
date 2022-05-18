import * as React from 'react';
import Container from '../../components/Container';
import NBInput from '../../components/NBInput';
import {
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
   ScrollView,
} from 'react-native';
import CButton from '../../components/Button';
import {styles} from '../../assets/styles/styles';
import stylePrimary from '../../assets/styles/stylePrimary';
import {TextArea, Box, Image, Select} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import BSelect from '../../components/BSelect';
import {getListCategory, addDataCategory} from '../../redux/actions/category';
import {launchImageLibrary} from 'react-native-image-picker';
import {addDataVehicle} from '../../redux/actions/vehicle';
import imagePhoto from '../../assets/images/image-photo.png';
import {NBAlert} from '../../components/NBAlert';
import NBModal from '../../components/NBModal';
import {validation} from '../../helpers/validation';
import NBModalLoading from '../../components/NBModalLoading';
import NBModalError from '../../components/NBModalError';
import NBModalSuccess from '../../components/NBModalSuccess';
import NBTextArea from '../../components/NBTextArea';
import Input from '../../components/Input';
import {getListLocation, addDataLocation} from '../../redux/actions/location';
import {getListVehicleByCategory} from '../../redux/actions/vehicle';
import ErrorMessage from '../../components/ErrorMessage';
import {LIMIT_CATEGORY} from '@env';

const AddItem = ({navigation}) => {
   const {auth, category, vehicle, location} = useSelector(state => state);
   var [inputItem, setInputItem] = useState({
      name: '',
      price: '',
      stock: '0',
      description: '',
      location: '',
      category: '',
   });
   const dispatch = useDispatch();
   const [image, setImage] = useState({});
   const [picture, setPicture] = useState(imagePhoto);
   const [control, setControl] = useState(false);
   const [showModalCategory, setShowModalCategory] = useState(false);
   const handleCloseModalCategory = () => setShowModalCategory(false);
   const [showModalLocation, setShowModalLocation] = useState(false);
   const handleCloseModalLocation = () => setShowModalLocation(false);
   const [dataCategory, setDataCategory] = useState('');
   const [dataLocation, setDataLocation] = useState('');
   const [errValidation, setErrValidation] = useState({});
   const [showModalSuccess, setShowModalSuccess] = useState(false);
   const handleCloseModalSuccess = () => setShowModalSuccess(false);
   const [showModalError, setShowModalError] = useState(false);
   const handleCloseModalError = () => setShowModalError(false);
   const [showModalLoading, setShowModalLoading] = useState(false);
   const [messageError, setMessageError] = useState('');
   const [messageSuccess, setMessageSuccess] = useState('');
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

   useEffect(() => {
      setErrValidation({});
      setInputItem({
         name: '',
         price: '',
         stock: '0',
         description: '',
         location: '',
         category: '',
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (category.dataCategory !== null && control == true) {
         dispatch(getListCategory());
         inputItem.category = category.dataCategory.id;
         setInputItem(inputItem);
         // setCategoryId(category.dataCategory.id);
         setControl(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [category.dataCategory]);

   useEffect(() => {
      setShowModalLoading(vehicle.isLoading);
      if (vehicle.isLoading == false && control == true) {
         if (vehicle.isError) {
            setMessageError(vehicle.errMessage);
            setShowModalError(true);
         } else {
            setMessageSuccess(vehicle.message);
            setShowModalSuccess(true);
            category.listCategory.length > 0 &&
               category.listCategory.forEach(itemCategory => {
                  dispatch(
                     getListVehicleByCategory(itemCategory.id, LIMIT_CATEGORY),
                  );
               });
            setControl(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [vehicle.isLoading]);

   useEffect(() => {
      setShowModalLoading(category.isLoading);
      setShowModalLocation(false);
      if (category.isLoading == false && control == true) {
         if (category.isError) {
            setMessageError(category.errMessage);
            setShowModalError(true);
         } else {
            setMessageSuccessLocationCategory(category.message);
            setShowModalSuccessLocationCategory(true);
            setControl(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [category.isLoading]);

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
            inputItem.location = location.dataLocation.id;
            setInputItem(inputItem);
            setControl(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [location.isLoading]);

   const countIncrement = () => {
      inputItem.qty = (parseInt(inputItem.qty) + 1).toString();
      setInputItem({...inputItem, qty: inputItem.qty});
   };

   const countDecrement = () => {
      if (parseInt(inputItem.qty) > 0) {
         inputItem.qty = (parseInt(inputItem.qty) - 1).toString();
         setInputItem({...inputItem, qty: inputItem.qty});
         // setQty((parseInt(qty) - 1).toString());
      }
   };

   const browseImage = async () => {
      const imagePicker = await launchImageLibrary({}, image => {
         setPicture({uri: image.assets[0].uri});
      });
      setImage({...imagePicker});
   };

   const validateImage = () => {
      const typeImage = ['image/jpeg', 'image/png', 'image/gif'];
      if (Object.keys(image).length > 0) {
         console.log(image);
         if (image.assets[0].fileSize > 2000000) {
            setMessageError('Image size max 2MB');
         }
         if (!typeImage.includes(image.assets[0].type)) {
            setMessageError('Image type must be .jpg/.png/.gif');
         }
         // setShowModalError(true);
      }
   };

   const addItemHandle = () => {
      var requirement = {
         name: 'required',
         price: 'required|number',
         location: 'choose',
         category: 'choose',
         description: 'required',
         stock: 'grather0',
      };
      inputItem.location = inputItem.location.toString();
      inputItem.category = inputItem.category.toString();
      const validate = validation(inputItem, requirement);
      const typeImage = ['image/jpeg', 'image/png', 'image/gif'];
      if (Object.keys(image).length > 0) {
         if (image.assets[0].fileSize > 2000000) {
            setMessageError('Image size max 2MB');
         }
         if (!typeImage.includes(image.assets[0].type)) {
            setMessageError('Image type must be .jpg/.png/.gif');
         }
         setShowModalError(true);
      }
      if (Object.keys(validate).length == 0) {
         var dataSend = {
            name: inputItem.name,
            category_id: inputItem.category,
            location_id: inputItem.location,
            price: inputItem.price,
            qty: inputItem.stock,
            isAvailable: '1',
            description: inputItem.description,
         };
         if (Object.keys(image).length > 0) {
            dispatch(addDataVehicle(auth.token, dataSend, image.assets[0]));
         } else {
            dispatch(addDataVehicle(auth.token, dataSend));
         }
         setControl(true);
      } else {
         setErrValidation(validate);
      }
   };

   const addCategoryHandle = () => {
      const data = {
         'data category': dataCategory,
      };

      const requirement = {
         'data category': 'required',
      };
      var validate = validation(data, requirement);
      console.log(validate);
      if (Object.keys(validate).length == 0) {
         const categoryFilter = category.listCategory.filter(item =>
            item.name.toLowerCase().includes(dataCategory.toLowerCase()),
         );
         console.log(categoryFilter);
         if (categoryFilter.length > 0) {
            validate = {
               ...validate,
               'data category': 'Category has already used',
            };
         }
      }

      if (Object.keys(validate).length == 0) {
         dispatch(addDataCategory(auth.token, dataCategory));
         setControl(true);
         setInputItem({...inputItem, category: dataCategory.id});
         // setCategoryId(dataCategory.id);
         setShowModalCategory(false);
         setDataCategory(null);
         setErrValidation({});
      } else {
         setErrValidation(validate);
      }
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
         setInputItem({...inputItem, location: dataLocation.id});
         // setCategoryId(dataCategory.id);
         setShowModalLocation(false);
         setDataLocation(null);
         setErrValidation({});
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
                     button={'Go to home'}
                     functionHandle={() => navigation.navigate('Home')}
                  />
               )}
               {messageSuccessLocationCategory !== '' && (
                  <NBModalSuccess
                     show={showModalSuccessLocationCategory}
                     message={messageSuccessLocationCategory}
                     close={handleCloseModalSuccessLocationCategory}
                  />
               )}
               <View style={addStyles.layoutImageEdit}>
                  <Image
                     size={100}
                     resizeMode={'contain'}
                     borderRadius={100}
                     source={picture}
                     alt="Profile"
                  />
                  <TouchableOpacity onPress={browseImage}>
                     <CButton
                        classButton={addStyles.buttonAddPicture}
                        textButton={addStyles.fontButtonAddPicture}>
                        Add pictures
                     </CButton>
                  </TouchableOpacity>
               </View>
               <View style={addStyles.layoutForm}>
                  <Text style={addStyles.textErrorImage}>
                     {Object.keys(image).length > 0 &&
                        image.assets[0].fileSize > 2000000 &&
                        'Photo max 2 MB'}
                     {Object.keys(image).length > 0 &&
                        !typeImage.includes(image.assets[0].type) &&
                        'Image type must be .jpg/.png/.gif '}
                  </Text>
                  <View style={addStyles.layoutInput}>
                     <NBInput
                        placeholder={'Type product name min 30 Characters'}
                        classVariant="item"
                        value={inputItem.name}
                        change={newName =>
                           setInputItem({...inputItem, name: newName})
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
                  <View style={addStyles.layoutInput}>
                     <NBInput
                        placeholder={'Type product price'}
                        classVariant="item"
                        value={inputItem.price}
                        change={newPrice =>
                           setInputItem({...inputItem, price: newPrice})
                        }
                        isValidate={
                           Object.keys(errValidation).length > 0 && true
                        }
                        errorMessage={
                           Object.keys(errValidation).length > 0 &&
                           errValidation.price
                        }
                     />
                  </View>
                  <View style={addStyles.layoutFormDescription}>
                     <View style={addStyles.layoutInput}>
                        <Text style={addStyles.label}>Description</Text>
                        <NBTextArea
                           placeholder={
                              'Describe your product min. 150 character'
                           }
                           variant="item"
                           value={inputItem.description}
                           change={newDescription =>
                              setInputItem({
                                 ...inputItem,
                                 description: newDescription,
                              })
                           }
                           valid={Object.keys(errValidation).length > 0 && true}
                           message={
                              Object.keys(errValidation).length > 0 &&
                              errValidation.description
                           }
                        />
                     </View>
                     <View style={addStyles.layoutInput}>
                        <Box w="100%">
                           <Text style={addStyles.label}>Location</Text>
                           <BSelect
                              width="100%"
                              placeholder="Location"
                              variantSelect="item"
                              isInvalid={
                                 Object.keys(errValidation).length > 0 && true
                              }
                              errMessage={
                                 Object.keys(errValidation).length > 0 &&
                                 errValidation.location
                              }
                              select={inputItem.location}
                              change={itemValue =>
                                 setInputItem({
                                    ...inputItem,
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
                                    Object.keys(errValidation).length > 0 &&
                                    true
                                 }
                                 errorMessage={
                                    Object.keys(errValidation).length > 0 &&
                                    errValidation['data location']
                                 }
                                 change={setDataLocation}
                              />
                           </NBModal>
                        </Box>
                     </View>
                     <View style={addStyles.layoutInput}>
                        <Box w="100%">
                           <Text style={addStyles.label}>Add to</Text>
                           <BSelect
                              width="100%"
                              placeholder="Category"
                              variantSelect="item"
                              select={inputItem.category}
                              isInvalid={
                                 Object.keys(errValidation).length > 0 && true
                              }
                              errMessage={
                                 Object.keys(errValidation).length > 0 &&
                                 errValidation.category
                              }
                              change={itemValue =>
                                 setInputItem({
                                    ...inputItem,
                                    category: itemValue,
                                 })
                              }>
                              {category.listCategory.map(item => {
                                 return (
                                    <Select.Item
                                       key={item.id}
                                       label={item.name}
                                       value={item.id}
                                       _text={addStyles.textSelect}
                                    />
                                 );
                              })}
                              <Select.Item
                                 label="+ Add Category"
                                 onPress={() => setShowModalCategory(true)}
                                 _text={addStyles.textSelect}
                                 value={0}
                              />
                           </BSelect>
                           <NBModal
                              title="Category"
                              show={showModalCategory}
                              functionClose={handleCloseModalCategory}
                              functionHandle={addCategoryHandle}
                              isButtonCancel={true}
                              button="Save">
                              <NBInput
                                 placeholder={'Type Category'}
                                 classVariant="item"
                                 value={dataCategory}
                                 isValidate={
                                    Object.keys(errValidation).length > 0 &&
                                    true
                                 }
                                 errorMessage={
                                    Object.keys(errValidation).length > 0 &&
                                    errValidation['data category']
                                 }
                                 change={setDataCategory}
                              />
                           </NBModal>
                        </Box>
                     </View>
                     <View style={addStyles.layoutQtyBikes}>
                        <Text style={addStyles.fontLabel}>Stock :</Text>
                        <View style={addStyles.layoutQty}>
                           <TouchableOpacity onPress={countDecrement}>
                              <CButton
                                 classButton={addStyles.button}
                                 textButton={addStyles.text}>
                                 -
                              </CButton>
                           </TouchableOpacity>
                           <Input
                              style={addStyles.inputQty}
                              value={inputItem.stock}
                              change={newQty =>
                                 setInputItem({...inputItem, stock: newQty})
                              }
                              keyboardType="numeric"
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
                     {Object.keys(errValidation).length > 0 &&
                        errValidation.stock && (
                           <ErrorMessage error={errValidation.stock} />
                        )}
                  </View>
                  <View style={addStyles.layoutButton}>
                     <TouchableOpacity onPress={addItemHandle}>
                        <CButton
                           classButton={styles.buttonPayment}
                           textButton={styles.fontButtonPayment}>
                           Save Product
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
      marginTop: 35,
   },
   layoutRadio: {
      flexDirection: 'row',
      marginBottom: 22,
      paddingHorizontal: 5,
   },
   layoutInput: {
      marginBottom: 10,
   },
   layoutFormDescription: {
      marginTop: 30,
   },
   layoutImageEdit: {
      alignItems: 'center',
      top: 40,
      justifyContent: 'center',
      marginBottom: 35,
      width: '100%',
   },
   label: {
      color: stylePrimary.mainColor,
      fontSize: 17,
      fontWeight: stylePrimary.bold,
      marginBottom: 5,
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
      marginTop: 20,
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
      color: stylePrimary.mainColor,
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
   textSelect: {
      color: stylePrimary.mainColor,
      fontSize: 14,
      textAlign: 'center',
   },
   inputQty: {
      width: 30,
      color: stylePrimary.mainColor,
      textAlign: 'center',
      fontSize: 15,
      fontWeight: '700',
   },
   layoutButton: {
      marginTop: 34,
      marginBottom: 30,
   },
   layoutButtonAddPicture: {
      marginTop: 23,
      width: '100%',
   },
   buttonAddPicture: {
      height: 38,
      backgroundColor: stylePrimary.mainColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 23,
      width: 150,
   },
   fontButtonAddPicture: {
      fontSize: 13,
      color: stylePrimary.secondaryColor,
   },
   textErrorImage: {
      fontSize: 12,
      color: 'red',
      textAlign: 'center',
   },
});

export {addStyles};
export default AddItem;
