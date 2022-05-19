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
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import CInput from '../components/Input';
import CButton from '../components/Button';
import stylePrimary from '../assets/styles/stylePrimary';
import IconRun from 'react-native-vector-icons/FontAwesome5';
import imageBackground from '../assets/images/image-item.png';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import BSelect from '../components/BSelect';
import Rate from '../components/Rate';
import LinearGradient from 'react-native-linear-gradient';
import IconLeft from 'react-native-vector-icons/FontAwesome';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {useState, useEffect} from 'react';
import IconDate from 'react-native-vector-icons/Fontisto';
import IconChat from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailVehicle} from '../redux/actions/vehicle';
import {Select} from 'native-base';
import {reservationProcess} from '../redux/actions/reservation';
import {
   addFavorite,
   getListFavorite,
   deleteFavorite,
} from '../redux/actions/favorite';
import {validation} from '../helpers/validation';
import ErrorMessage from '../components/ErrorMessage';
import NumberFormat from 'react-number-format';

const Reservation = ({navigation}) => {
   const {vehicle, counter, auth, reservation, favorite} = useSelector(
      state => state,
   );
   const [inputReservation, setInputReservation] = useState({
      qty: '0',
      day: '',
   });
   const dispatch = useDispatch();
   const [control, setControl] = useState(false);
   const [picture, setPicture] = useState();
   const [isAddFavorite, setAddFavorite] = useState(false);
   const [errorValidation, setErrorValidation] = useState({});
   const [dateReservetion, setDateReservation] = useState(new Date());

   useEffect(() => {
      setInputReservation({
         qty: '0',
         day: '',
      });
      console.log(inputReservation.date);
      setPicture(
         vehicle.dataVehicle !== null && vehicle.dataVehicle.photo !== null
            ? {uri: `${vehicle.dataVehicle.photo}`}
            : imageBackground,
      );
      dispatch(getListFavorite());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (vehicle.dataVehicle !== null) {
         setPicture(
            vehicle.dataVehicle !== null && vehicle.dataVehicle.photo !== null
               ? {uri: `${vehicle.dataVehicle.photo}`}
               : imageBackground,
         );
      }
   }, [vehicle.dataVehicle]);

   useEffect(() => {
      if (reservation.dataReservation !== null && control) {
         navigation.navigate('Payment');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [reservation.dataReservation]);

   const countIncrement = () => {
      inputReservation.qty = parseInt(inputReservation.qty) + 1;
      setInputReservation({
         ...inputReservation,
         qty: inputReservation.qty.toString(),
      });
   };

   const countDecrement = () => {
      if (inputReservation.qty > 0) {
         inputReservation.qty = parseInt(inputReservation.qty) - 1;
         setInputReservation({
            ...inputReservation,
            qty: inputReservation.qty.toString(),
         });
      }
   };

   const onChange = (event, selectedDate) => {
      setDateReservation(selectedDate);
   };

   const showDatePicker = () => {
      DateTimePickerAndroid.open({
         value: dateReservetion,
         onChange,
         mode: 'date',
         is24Hour: true,
      });
   };

   const reservationHandle = () => {
      inputReservation.date = dateReservetion;
      const requirement = {
         date: 'required',
         day: 'required',
         qty: 'required|number|grather0',
      };
      inputReservation.date = inputReservation.date.toString();
      inputReservation.day = inputReservation.day.toString();
      const validate = validation(inputReservation, requirement);
      if (Object.keys(validate).length == 0) {
         dispatch(reservationProcess(vehicle.dataVehicle, inputReservation));
         setControl(true);
      } else {
         setErrorValidation(validate);
      }
   };

   const favoriteHandle = itemFavorite => {
      if (favorite.listFavorite.length > 0) {
         const listFavorite = favorite.listFavorite.filter(
            item => item.id == itemFavorite.id,
         );
         if (listFavorite.length > 0) {
            dispatch(deleteFavorite(itemFavorite));
            setAddFavorite(false);
         } else {
            dispatch(addFavorite(itemFavorite));
            setAddFavorite(true);
         }
      } else {
         dispatch(addFavorite(itemFavorite));
         setAddFavorite(true);
      }
   };

   return (
      <SafeAreaView style={styles.background}>
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
                           <Rate
                              rate={
                                 vehicle.dataVehicle !== null &&
                                 vehicle.dataVehicle.rate
                              }
                           />
                           <TouchableOpacity
                              onPress={() =>
                                 favoriteHandle(vehicle.dataVehicle)
                              }>
                              {isAddFavorite ||
                              favorite.listFavorite.filter(
                                 item => item.id == vehicle.dataVehicle.id,
                              ).length > 0 ? (
                                 <IconMaterial
                                    name="favorite"
                                    style={addStyles.iconHeartFill}
                                 />
                              ) : (
                                 <IconMaterial
                                    name="favorite-outline"
                                    style={addStyles.iconHeart}
                                 />
                              )}
                           </TouchableOpacity>
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
                           {vehicle.dataVehicle !== null &&
                              vehicle.dataVehicle.name}
                        </Text>
                        <NumberFormat
                           value={
                              vehicle?.dataVehicle.price !== null
                                 ? vehicle.dataVehicle.price
                                 : 0
                           }
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
                     </View>
                     <View>
                        <View
                           style={[
                              addStyles.flexRow,
                              addStyles.layoutIconRate,
                           ]}>
                           <IconChat
                              name="chatbubble-outline"
                              style={addStyles.iconChat}
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
                           colors={[stylePrimary.secondaryColor, '#7796b6']}
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
                        <Text style={addStyles.fontLabel}>Select bikes</Text>
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
                              value={inputReservation.qty}
                              change={newQty =>
                                 setInputReservation({
                                    ...inputReservation,
                                    qty: newQty,
                                 })
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
                     {Object.keys(errorValidation).length > 0 &&
                        errorValidation.qty && (
                           <ErrorMessage error={errorValidation.qty} />
                        )}
                  </View>
                  <View style={addStyles.layoutForm}>
                     <View style={{position: 'relative'}}>
                        <CInput
                           classInput={addStyles.inputDate}
                           placeholder="Date"
                           value={moment(dateReservetion.toDateString()).format(
                              'YYYY-MM-DD',
                           )}
                           // value={moment(
                           //    inputReservation.date.toLocaleString(),
                           // ).format('YYYY-MM-DD')}
                           error={errorValidation.date && errorValidation.date}
                        />
                        <TouchableOpacity onPress={showDatePicker}>
                           <IconDate name="date" style={addStyles.iconDate} />
                        </TouchableOpacity>
                     </View>
                     <BSelect
                        width="40%"
                        placeholder="Day"
                        variantSelect="reservation"
                        select={inputReservation.day}
                        change={itemValue =>
                           setInputReservation({
                              ...inputReservation,
                              day: itemValue,
                           })
                        }
                        isInvalid={
                           Object.keys(errorValidation).length > 0 && true
                        }
                        errMessage={
                           Object.keys(errorValidation).length > 0 &&
                           errorValidation.day
                        }>
                        <Select.Item label="1" value={1} />
                        <Select.Item label="2" value={2} />
                        <Select.Item label="3" value={3} />
                     </BSelect>
                     {/* <Input classInput={addStyles.inputDay} placeholder="Day" /> */}
                  </View>
               </View>
               <View style={addStyles.layoutButton}>
                  <TouchableOpacity onPress={reservationHandle}>
                     <CButton
                        classButton={addStyles.buttonReservation}
                        press={() => navigation.navigate('Payment')}
                        textButton={addStyles.fontButtonReservation}>
                        Reservation
                     </CButton>
                  </TouchableOpacity>
               </View>
            </Container>
         </ScrollView>
      </SafeAreaView>
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
      color: stylePrimary.mainColor,
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
      color: stylePrimary.mainColor,
      fontWeight: '700',
      fontSize: 30,
      marginLeft: 10,
   },
   iconHeartFill: {
      color: 'red',
      fontWeight: '700',
      fontSize: 30,
      marginLeft: 10,
   },
   iconChat: {
      fontWeight: '700',
      fontSize: 30,
      marginLeft: 10,
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
      width: 30,
      color: stylePrimary.mainColor,
      textAlign: 'center',
      fontWeight: stylePrimary.bold,
   },
   layoutForm: {
      marginTop: 28,
      flexDirection: 'row',
      width: '100%',
   },
   inputDate: {
      backgroundColor: stylePrimary.backgrorund,
      borderColor: stylePrimary.mainColor,
      borderWidth: 1,
      // opacity: 0.1,
      borderRadius: 10,
      minWidth: '60%',
      height: 50,
      paddingLeft: 10,
      marginRight: 10,
   },
   inputDay: {
      backgroundColor: 'rgba(57, 57, 57, 0.3)',
      // opacity: 0.1,
      borderRadius: 10,
      width: 100,
      height: 50,
      paddingLeft: 10,
   },
   layoutButton: {
      marginTop: 26,
   },
   buttonChat: {
      backgroundColor: stylePrimary.mainColor,
      justifyContent: 'center',
      alignItems: 'center',
      height: 66,
      borderRadius: 10,
   },
   fontButtonChat: {
      fontSize: 24,
      color: stylePrimary.secondaryColor,
      fontWeight: '700',
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

export default Reservation;
