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

const newLocal = 'required';
const AddItem = ({navigation}) => {
   const {category} = useSelector(state => state);
   const {auth, vehicle} = useSelector(state => state);
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');
   const [qty, setQty] = useState(0);
   const [description, setDescription] = useState('');
   const [location, setLocation] = useState('');
   const [categoryId, setCategoryId] = useState('');
   const dispatch = useDispatch();
   const [image, setImage] = useState([]);
   const [picture, setPicture] = useState(imagePhoto);
   const [control, setControl] = useState(false);
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);
   const [dataCategory, setDataCategory] = useState(null);
   const [errValidation, setErrValidation] = useState({});

   useEffect(() => {
      dispatch(getListCategory());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (category.dataCategory !== null && control) {
         dispatch(getListCategory());
         setCategoryId(category.dataCategory.id);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [category.dataCategory]);

   const countIncrement = () => {
      setQty(qty + 1);
   };

   const countDecrement = () => {
      if (qty > 0) {
         setQty(qty - 1);
      }
   };

   const browseImage = async () => {
      const imagePicker = await launchImageLibrary({}, async image => {
         setPicture({uri: image.assets[0].uri});
      });
      setImage({...imagePicker});
   };

   const addItemHandle = () => {
      console.log(image);
      var dataSend = {
         name,
         category_id: categoryId.toString(),
         location,
         price,
         qty: qty.toString(),
         isAvailable: '1',
         description: description,
      };
      // console.log(dataSend);
      // var dataVehicle = [];
      // Object.keys(dataSend).forEach(key => {
      //    dataVehicle.push({name: `${key}`, data: dataSend[key]});
      // });
      // console.log(dataVehicle);
      var requirement = {
         name: 'required',
         price: 'required|number',
      };

      const validate = validation(dataSend, requirement);
      if (Object.keys(validate).length == 0) {
         dispatch(addDataVehicle(auth.token, dataSend, image.assets[0]));
         setControl(true);
      } else {
         setErrValidation(validate);
      }
   };

   const addCategoryHandle = () => {
      dispatch(addDataCategory(auth.token, dataCategory));
      setControl(true);
      setCategoryId(dataCategory.id);
      setShow(false);
      setDataCategory(null);
   };

   return (
      <View style={styles.background}>
         <Container>
            <ScrollView>
               {control && (
                  <NBAlert status="success" message={vehicle.message} />
               )}
               {vehicle.isError && (
                  <NBAlert status="error" message={vehicle.errMessage} />
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
                  </Text>
                  <View style={addStyles.layoutInput}>
                     <NBInput
                        placeholder={'Type product name min 30 Characters'}
                        classVariant="item"
                        value={name}
                        change={setName}
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
                        value={price}
                        change={setPrice}
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
                        <Box w="100%">
                           <Text style={addStyles.label}>Description</Text>
                           <TextArea
                              placeholder="Describe your product min. 150 characters"
                              variant="item"
                              value={description}
                              onChangeText={setDescription}
                           />
                        </Box>
                     </View>
                     <View style={addStyles.layoutInput}>
                        <Box w="100%">
                           <Text style={addStyles.label}>Location</Text>
                           <BSelect
                              width="100%"
                              placeholder="Location"
                              variantSelect="item"
                              select={location}
                              change={itemValue => setLocation(itemValue)}>
                              <Select.Item label="Bandung" value={'Bandung'} />
                              <Select.Item label="Jakarta" value={'Jakarta'} />
                              <Select.Item
                                 label="Yogyakarta"
                                 value={'Yogyakarta'}
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
                              select={categoryId}
                              change={itemValue => setCategoryId(itemValue)}>
                              {category.listCategory.map(item => {
                                 return (
                                    <Select.Item
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
                           <NBModal
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
                           <Text style={addStyles.inputQty}>{qty}</Text>
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
});

export {addStyles};
export default AddItem;
