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

const AddItem = ({navigation}) => {
   const {auth, category, vehicle, location} = useSelector(state => state);
   const [inputItem, setInputItem] = useState({
      name: '',
      price: '',
      qty: '0',
      description: '',
      location: '',
      category: '',
   });
   const dispatch = useDispatch();
   const [image, setImage] = useState({});
   const [picture, setPicture] = useState(imagePhoto);
   const [control, setControl] = useState(false);
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);
   const [dataCategory, setDataCategory] = useState(null);
   const [errValidation, setErrValidation] = useState({});
   const [showModalSuccess, setShowModalSuccess] = useState(false);
   const handleCloseModalSuccess = () => setShowModalSuccess(false);
   const [showModalError, setShowModalError] = useState(false);
   const handleCloseModalError = () => setShowModalError(false);
   const [showModalLoading, setShowModalLoading] = useState(false);
   const [messageError, setMessageError] = useState('');
   var [messageSuccess, setMessageSuccess] = useState('');

   useEffect(() => {
      setErrValidation({});
      inputItem.qty = '0';
      setInputItem(inputItem);
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
            setControl(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [vehicle.isLoading]);

   useEffect(() => {
      setShowModalLoading(category.isLoading);
      if (category.isLoading == false && control == true) {
         if (category.isError) {
            setMessageError(category.errMessage);
            setShowModalError(true);
         } else {
            setMessageSuccess(category.message);
            setShowModalSuccess(true);
            setControl(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [category.isLoading]);

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
      const imagePicker = await launchImageLibrary({}, async image => {
         setPicture({uri: image.assets[0].uri});
      });
      setImage({...imagePicker});
   };

   const addItemHandle = () => {
      var requirement = {
         name: 'required',
         price: 'required|number',
         location: 'choose',
         category: 'choose',
         description: 'required',
      };
      inputItem.location = inputItem.location.toString();
      inputItem.category = inputItem.category.toString();
      const validate = validation(inputItem, requirement);
      console.log(image);
      if (Object.keys(validate).length == 0) {
         var dataSend = {
            name: inputItem.name,
            category_id: inputItem.category,
            location_id: inputItem.location,
            price: inputItem.price,
            qty: inputItem.qty,
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

   // const addCategoryHandle = () => {
   //    dispatch(addDataCategory(auth.token, dataCategory));
   //    setControl(true);
   //    setCategoryId(dataCategory.id);
   //    setShow(false);
   //    setDataCategory(null);
   // };

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
                  {/* <Text style={addStyles.textErrorImage}>
                     {Object.keys(image).length > 0 &&
                        image.assets[0].fileSize > 2000000 &&
                        'Photo max 2 MB'}
                  </Text> */}
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
                                          label={item.location}
                                          value={item.id}
                                       />
                                    );
                                 })}
                              <Select.Item
                                 label="Add Location"
                                 value={'Bandung'}
                              />
                           </BSelect>
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
                                    />
                                 );
                              })}
                              <Select.Item
                                 label="Add Category"
                                 value={'Yogyakarta'}
                                 onPress={handleShow}
                              />
                           </BSelect>
                           {/* <NBModal
                              title="Category"
                              show={show}
                              functionShow={handleShow}
                              functionClose={handleClose}
                              functionHandle={addCategoryHandle}
                              isButton={true}
                              buttonTitile="Save">
                              <NBInput
                                 placeholder={'Type Category'}
                                 classVariant="item"
                                 value={dataCategory}
                                 change={setDataCategory}
                              />
                           </NBModal> */}
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
                              value={inputItem.qty}
                              change={newQty =>
                                 setInputItem({...inputItem, qty: newQty})
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
      marginBottom: 20,
   },
   layoutFormDescription: {
      marginTop: 38,
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
      marginBottom: 15,
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
   inputQty: {
      width: 50,
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
