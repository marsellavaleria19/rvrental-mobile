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
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../../assets/styles/styles';
import stylePrimary from '../../assets/styles/stylePrimary';
import {TextArea, Box, Image, Select} from 'native-base';
import imageProfile from '../../assets/images/profile.png';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import BSelect from '../../components/BSelect';
import {getListCategory} from '../../redux/actions/category';

const AddItem = ({navigation}) => {
   const {category} = useSelector(state => state);
   const {auth} = useSelector(state => state);
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');
   const [qty, setQty] = useState(0);
   const [mobileNumber, setMobileNumber] = useState('');
   const [description, setDescription] = useState('');
   const [location, setLocation] = useState('');
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getListCategory());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const countIncrement = () => {
      setQty(qty + 1);
   };

   const countDecrement = () => {
      if (qty > 0) {
         setQty(qty - 1);
      }
   };

   return (
      <View style={styles.background}>
         <Container>
            <ScrollView>
               <View style={addStyles.layoutImageEdit}>
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
                  <CButton
                     classButton={addStyles.buttonAddPicture}
                     textButton={addStyles.fontButtonAddPicture}>
                     Add pictures
                  </CButton>
               </View>
               <View style={addStyles.layoutForm}>
                  <View style={addStyles.layoutInput}>
                     <NBInput
                        placeholder={'Type product name min 30 Characters'}
                        classVariant="item"
                        value={name}
                        change={setName}
                     />
                  </View>
                  <View style={addStyles.layoutInput}>
                     <NBInput
                        placeholder={'Type product price'}
                        classVariant="item"
                        value={price}
                        change={setPrice}
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
                              onChange={setDescription}
                           />
                        </Box>
                     </View>
                     <View style={addStyles.layoutInput}>
                        <Box w="100%">
                           <Text style={addStyles.label}>Location</Text>
                           <BSelect
                              width="100%"
                              placeholder="Location"
                              backgroud="white"
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
                              placeholder="Location"
                              backgroud="white"
                              select={location}
                              change={itemValue => setLocation(itemValue)}>
                              {category.listCategory.length > 0 &&
                                 category.listCategory.map(item => {
                                    return (
                                       <Select.Item
                                          label={item.name}
                                          value={item.id}
                                       />
                                    );
                                 })}
                              {/* <Select.Item label="Bandung" value={'Bandung'} />
                              <Select.Item label="Jakarta" value={'Jakarta'} />
                              <Select.Item
                                 label="Yogyakarta"
                                 value={'Yogyakarta'}
                              /> */}
                           </BSelect>
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
                     <TouchableOpacity
                        onPress={() => navigation.navigate('EditItem')}>
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
      width: '50%',
   },
   fontButtonAddPicture: {
      fontSize: 13,
      color: stylePrimary.secondaryColor,
   },
});

export {addStyles};
export default AddItem;
