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
import imageBackground from '../../assets/images/background-reservation.png';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Rate from '../../components/Rate';
import LinearGradient from 'react-native-linear-gradient';
import IconLeft from 'react-native-vector-icons/FontAwesome';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IconDelete from 'react-native-vector-icons/FontAwesome';
// import {getDetailVehicle} from '../redux/actions/vehicle';
// import {reservationProcess} from '../redux/actions/reservation';

const UpdateItem = ({navigation}) => {
   const {vehicle, counter, auth, reservation} = useSelector(state => state);
   // const {vehicleId} = route.params;
   const [date, setDate] = useState(new Date());
   const [qty, setQty] = useState(0);
   const dispatch = useDispatch();
   const [day, setDay] = useState(0);
   const [control, setControl] = useState(false);

   // useEffect(() => {
   //    dispatch(getDetailVehicle(vehicleId));
   //    setQty(0);
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, []);

   const countIncrement = () => {
      setQty(qty + 1);
   };

   const countDecrement = () => {
      if (qty > 0) {
         setQty(qty - 1);
      }
   };

   // const reservationHandle = () => {
   //    dispatch(reservationProcess(vehicle.dataVehicle, qty, day, date));
   //    setControl(true);
   // };

   return (
      <View style={styles.background}>
         <ScrollView>
            <View>
               <ImageBackground
                  source={imageBackground}
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
            </View>
            <Container>
               <View style={addStyles.marginLayout}>
                  <View style={addStyles.layoutDescriptionRate}>
                     <View>
                        <Text style={addStyles.title}>
                           {vehicle.dataVehicle !== null
                              ? vehicle.dataVehicle.name
                              : 'Vario'}
                        </Text>
                        <Text style={addStyles.price}>
                           {vehicle.dataVehicle !== null
                              ? `Rp. ${vehicle.dataVehicle.price.toLocaleString(
                                   'id-ID',
                                )}/day`
                              : 'Rp.0'}
                        </Text>
                     </View>
                     <View>
                        <View style={addStyles.layoutDelete}>
                           <IconDelete
                              name="trash-o"
                              style={addStyles.iconDelete}
                           />
                        </View>
                     </View>
                  </View>
                  <View style={addStyles.layoutDescription}>
                     <Text style={addStyles.description}>Max for 2 person</Text>
                     <Text style={addStyles.description}>No prepayment</Text>
                     <Text style={styles.statusAvailable}>Available</Text>
                     <View style={addStyles.layoutLocation}>
                        <LinearGradient
                           colors={['#FFC7A733', '#FFD57933']}
                           style={[addStyles.layoutIconLocation]}>
                           <IconMaterial
                              name="location-on"
                              style={addStyles.iconLocation}
                           />
                        </LinearGradient>
                        <Text style={addStyles.fontLocation}>
                           {vehicle.dataVehicle !== null &&
                              vehicle.dataVehicle.location}
                        </Text>
                     </View>
                     <View style={addStyles.layoutDistance}>
                        <LinearGradient
                           colors={['#FFC7A733', '#FFD57933']}
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
                  <TouchableOpacity>
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
   iconDate: {
      color: '#FFFFFF',
      fontSize: 22,
      position: 'absolute',
      bottom: 15,
      right: 20,
   },
   iconBack: {
      color: '#FFFFFF',
      fontSize: 22,
      marginLeft: 20,
   },
   iconHeart: {
      color: 'white',
      fontWeight: '700',
      fontSize: 30,
      marginLeft: 10,
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
      color: 'orange',
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

export default UpdateItem;
