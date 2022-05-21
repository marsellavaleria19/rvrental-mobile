import * as React from 'react';
import {
   Text,
   View,
   StyleSheet,
   ImageBackground,
   Image,
   TouchableOpacity,
   SafeAreaView,
   ScrollView,
} from 'react-native';
import {styles} from '../../assets/styles/styles';
import Container from '../../components/Container';
import CButton from '../../components/Button';
import stylePrimary from '../../assets/styles/stylePrimary';
import IconRun from 'react-native-vector-icons/FontAwesome5';
import imageBackground from '../../assets/images/image-item.png';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Rate from '../../components/Rate';
import LinearGradient from 'react-native-linear-gradient';
import IconLeft from 'react-native-vector-icons/FontAwesome';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailVehicle, saveDetailVehicle} from '../../redux/actions/vehicle';
import NumberFormat from 'react-number-format';
// import {reservationProcess} from '../redux/actions/reservation';

const EditItem = ({navigation}) => {
   const {vehicle} = useSelector(state => state);
   // const {vehicleId} = route.params;
   const [qty, setQty] = useState(0);
   const [picture, setPicture] = useState();
   const dispatch = useDispatch();
   const [name, setName] = useState('');
   const [price, setPrice] = useState(0);
   const [location, setLocation] = useState('');
   const [isAvailable, setIsAvailable] = useState(0);

   useEffect(() => {
      // dispatch(getDetailVehicle(vehicleId));
      setQty(vehicle.dataVehicle?.qty);
      // setPicture(
      //    vehicle.dataVehicle !== null && vehicle.dataVehicle.photo !== null
      //       ? {uri: `${vehicle.dataVehicle.photo}`}
      //       : imageBackground,
      // );
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (vehicle.dataVehicle !== null) {
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
      }
   }, [vehicle.dataVehicle]);

   const countIncrement = () => {
      setQty(qty + 1);
   };

   const countDecrement = () => {
      if (qty > 0) {
         setQty(qty - 1);
      }
   };

   const editItemHandle = () => {
      dispatch(saveDetailVehicle(vehicle.dataVehicle));
      navigation.navigate('UpdateItem');
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
                        <View style={addStyles.flexRow}>
                           <Rate rate={vehicle.dataVehicle.rate} />
                        </View>
                     </View>
                  </Container>
               </ImageBackground>
            </View>
            <Container>
               <View style={addStyles.marginLayout}>
                  <View style={addStyles.layoutDescriptionRate}>
                     <View>
                        <Text style={addStyles.title}>{name}</Text>
                        <NumberFormat
                           value={price}
                           displayType={'text'}
                           thousandSeparator={true}
                           decimalSeparator="."
                           prefix={'Rp.'}
                           renderText={value => (
                              <Text style={addStyles.price}>
                                 {value.replace(',', '.')}/day
                              </Text>
                           )}
                        />
                        {/* <Text style={addStyles.price}>
                           {price !== 0
                              ? `Rp. ${price.toLocaleString('id-ID')}/day`
                              : 'Rp.0'}
                        </Text> */}
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
                        <Text style={addStyles.fontLocation}>{location}</Text>
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
                  </View>
               </View>
               <View style={addStyles.layoutButton}>
                  <TouchableOpacity onPress={editItemHandle}>
                     <CButton
                        classButton={addStyles.buttonReservation}
                        textButton={addStyles.fontButtonReservation}>
                        Edit Item
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
   iconDate: {
      color: '#FFFFFF',
      fontSize: 22,
      position: 'absolute',
      bottom: 15,
      right: 20,
   },
   iconBack: {
      color: stylePrimary.mainColor,
      fontSize: 22,
      marginLeft: 20,
   },
   iconHeart: {
      color: 'white',
      fontWeight: '700',
      fontSize: 30,
      marginLeft: 10,
   },
   iconChat: {
      fontWeight: '700',
      fontSize: 30,
      marginLeft: 10,
      color: '#FFCD61',
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
   },
   price: {
      fontSize: 24,
      fontWeight: '700',
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

export default EditItem;
