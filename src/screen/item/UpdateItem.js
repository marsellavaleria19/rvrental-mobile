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
import imageBackground from '../../assets/images/image-photo.png';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Rate from '../../components/Rate';
import LinearGradient from 'react-native-linear-gradient';
import IconLeft from 'react-native-vector-icons/FontAwesome';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IconDelete from 'react-native-vector-icons/FontAwesome';
import {
   updateDataVehicle,
   deleteDataVehicle,
} from '../../redux/actions/vehicle';
import {Select, Box} from 'native-base';
import BSelect from '../../components/BSelect';
import {launchImageLibrary} from 'react-native-image-picker';
import NBModal from '../../components/NBModal';
import {NBAlert} from '../../components/NBAlert';
// import {getDetailVehicle} from '../redux/actions/vehicle';
// import {reservationProcess} from '../redux/actions/reservation';

const UpdateItem = ({route, navigation}) => {
   const {vehicle, auth} = useSelector(state => state);
   const {vehicleId} = route.params;
   const [date, setDate] = useState(new Date());
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');
   const [location, setLocation] = useState('');
   const [isAvailable, setIsAvailable] = useState(0);
   const [qty, setQty] = useState(0);
   const dispatch = useDispatch();
   const [day, setDay] = useState(0);
   const [control, setControl] = useState(false);
   const [picture, setPicture] = useState(imageBackground);
   const [image, setImage] = useState({});
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   useEffect(() => {
      setName(vehicle.dataVehicle.name);
      setPrice(`${vehicle.dataVehicle.price}`);
      setLocation(vehicle.dataVehicle.location);
      setQty(vehicle.dataVehicle.qty);
      setIsAvailable(vehicle.dataVehicle.isAvailable);
      setPicture(
         vehicle.dataVehicle !== null && vehicle.dataVehicle.photo !== null
            ? {uri: `${vehicle.dataVehicle.photo}`}
            : imageBackground,
      );
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

   const updateItemHandle = () => {
      var data = {
         name,
         location,
         price,
         qty: qty.toString(),
         isAvailable: isAvailable.toString(),
      };
      if (Object.keys(image).length > 0) {
         dispatch(
            updateDataVehicle(auth.token, data, vehicleId, image.assets[0]),
         );
      } else {
         dispatch(updateDataVehicle(auth.token, data, vehicleId));
      }

      setControl(true);
   };

   const deleteItemHandle = () => {
      dispatch(deleteDataVehicle(auth.token, vehicleId));
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

   return (
      <View style={styles.background}>
         <ScrollView>
            <View>
               <TouchableOpacity onPress={browseImage}>
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
                           <View style={addStyles.flexRow}>
                              <Rate rate={4.5} />
                           </View>
                        </View>
                     </Container>
                  </ImageBackground>
               </TouchableOpacity>
            </View>
            <Container>
               <View style={addStyles.marginLayout}>
                  {control && (
                     <NBAlert status="success" message={vehicle.message} />
                  )}
                  {vehicle.isError && (
                     <NBAlert status="error" message={vehicle.errMessage} />
                  )}
                  <View style={addStyles.layoutDescriptionRate}>
                     <View>
                        <CInput
                           classInput={addStyles.title}
                           value={name}
                           change={setName}
                        />
                        <CInput
                           classInput={addStyles.price}
                           value={price}
                           change={setPrice}
                        />
                     </View>
                     <View>
                        <TouchableOpacity onPress={handleShow}>
                           <View style={addStyles.layoutDelete}>
                              <IconDelete
                                 name="trash-o"
                                 style={addStyles.iconDelete}
                              />
                           </View>
                        </TouchableOpacity>
                        <NBModal
                           title="Delete Product"
                           show={show}
                           functionShow={handleShow}
                           functionClose={handleClose}
                           functionHandle={deleteItemHandle}
                           buttonTitile="Delete">
                           <Text>
                              Are you sure want to delete this product?
                           </Text>
                        </NBModal>
                     </View>
                  </View>
                  <View style={addStyles.layoutDescription}>
                     <Text style={addStyles.description}>Max for 2 person</Text>
                     <Text style={addStyles.description}>No prepayment</Text>
                     <Text
                        style={
                           isAvailable == 1
                              ? styles.statusAvailable
                              : styles.statusNotAvailable
                        }>
                        {isAvailable == 1 ? 'Available ' : 'Full Booked'}
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
                        <CInput
                           classInput={addStyles.fontLocation}
                           value={location}
                           change={setLocation}
                        />
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
                     <View style={addStyles.layoutStatusStock}>
                        <Box w="100%">
                           <BSelect
                              width="100%"
                              placeholder="Update stock status"
                              variant="reservation"
                              select={isAvailable}
                              change={itemValue => setIsAvailable(itemValue)}>
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
      backgroundColor: stylePrimary.secondaryColor,
   },
   iconDelete: {
      fontWeight: '700',
      fontSize: 20,
      marginTop: 7,
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
});

export {addStyles};

export default UpdateItem;
