import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Container from '../../components/Container';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/Input';
import {useEffect, useState} from 'react';
import ListMenuFilter from '../../components/ListMenuFilter';
import {Switch, ScrollView, Select} from 'native-base';
import {styles} from '../../assets/styles/styles';
import CButton from '../../components/Button';
import BSelect from '../../components/BSelect';
import stylePrimary from '../../assets/styles/stylePrimary';
import moment from 'moment';
import IconDate from 'react-native-vector-icons/Fontisto';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {getListSearchFilter} from '../../redux/actions/search';
import filter from '../../helpers/FilterSearch';

const FilterMenu = ({navigation}) => {
   const {search, category} = useSelector(state => state);
   const dispatch = useDispatch();
   const [location, setLocation] = useState('');
   const [rate, setRate] = useState('');
   const [price, setPrice] = useState('');
   const [categoryId, setCategoryId] = useState('');
   const [noPrepayment, setNoPrepayment] = useState('');
   const [isAvailable, setIsAvailable] = useState('');
   const [listLocation, seListtLocation] = useState([
      'Bandung',
      'Jakarta',
      'Yogyakarta',
   ]);
   const [listRate, seListRate] = useState([
      {
         id: 1,
         name: '1-3',
         rate_start: '1',
         rate_end: '3',
      },
      {
         id: 2,
         name: '3-5',
         rate_start: '3',
         rate_end: '5',
      },
   ]);
   const [listPrice, seListPrice] = useState([
      {
         id: 1,
         name: 'Rp.100.000-Rp.200.000',
         price_start: '100000',
         price_end: '200000',
      },
      {
         id: 2,
         name: 'Rp.200.000-Rp.500.000',
         price_start: '200000',
         price_end: '500000',
      },
   ]);
   const [date, setDate] = useState(new Date());
   const [isDateChange, setIsDateChange] = useState(false);
   const [availableChange, setAvaliableChange] = useState(false);
   const [prepaymentChange, setPrepaymentChange] = useState(false);

   useEffect(() => {
      setIsDateChange(false);
   }, []);

   const onChange = (event, selectedDate) => {
      setIsDateChange(true);
      setDate(selectedDate);
   };

   const showDatePicker = () => {
      DateTimePickerAndroid.open({
         value: date,
         onChange,
         mode: 'date',
         is24Hour: true,
      });
   };

   const filterHandle = () => {
      filter.location = location;
      filter.rate = rate;
      var dataFilterPrice = null;
      var dataFilterRate = null;
      if (isDateChange == true) {
         filter.date = moment(date.toLocaleString()).format('YYYY-MM-DD');
      } else {
         filter.date = '';
      }

      if (price) {
         dataFilterPrice = listPrice.filter(item => item.id == price);
         filter.price_start = dataFilterPrice[0].price_start;
         filter.price_end = dataFilterPrice[0].price_end;
      }

      if (rate) {
         dataFilterRate = listRate.filter(item => item.id == rate);
         filter.rate_start = dataFilterRate[0].rate_start;
         filter.rate_end = dataFilterRate[0].rate_end;
      }

      filter.category_id = categoryId;
      if (prepaymentChange == true) {
         filter.no_prepayment = noPrepayment == true ? '1' : '0';
      } else {
         filter.prepayment = '';
      }
      if (availableChange == true) {
         filter.isAvailable = isAvailable == true ? '1' : '0';
      } else {
         filter.isAvailable = '';
      }

      dispatch(getListSearchFilter(filter));
      navigation.navigate('Filter');
      setPrepaymentChange(false);
      setAvaliableChange(false);
   };

   const toggleSwitch = item => {
      if (item == 'Available') {
         setAvaliableChange(true);
         setIsAvailable(previousState => !previousState);
      }
      if (item == 'Prepayment') {
         setPrepaymentChange(true);
         setNoPrepayment(previousState => !previousState);
         // console.log(prepayment);
      }
   };
   return (
      <View style={styles.background}>
         <Container>
            <ScrollView style={addStyles.layoutFilter}>
               <View style={addStyles.layoutInput}>
                  <BSelect
                     width="100%"
                     placeholder="Your Location"
                     backgroud={'white'}
                     color="dark.50"
                     variantSelect="filter"
                     value={location}
                     change={setLocation}>
                     {listLocation.map(item => {
                        return <Select.Item label={item} value={item} />;
                     })}
                  </BSelect>
               </View>
               <View style={addStyles.layoutInput}>
                  <BSelect
                     width="100%"
                     placeholder="Star rating"
                     variantSelect="filter"
                     value={rate}
                     change={setRate}>
                     {listRate.map(item => {
                        return (
                           <Select.Item label={item.name} value={item.id} />
                        );
                     })}
                  </BSelect>
               </View>
               <View style={addStyles.layoutInput}>
                  <BSelect
                     width="100%"
                     placeholder="Price"
                     variantSelect="filter"
                     value={price}
                     change={setPrice}>
                     {listPrice.map(item => {
                        return (
                           <Select.Item label={item.name} value={item.id} />
                        );
                     })}
                  </BSelect>
               </View>
               <View style={addStyles.layoutInput}>
                  <View style={{position: 'relative'}}>
                     <Input
                        classInput={addStyles.inputDate}
                        placeholder="Date"
                        value={
                           date !== null &&
                           moment(date.toLocaleString()).format('YYYY-MM-DD')
                        }
                     />
                     <TouchableOpacity onPress={showDatePicker}>
                        <IconDate name="date" style={addStyles.iconDate} />
                     </TouchableOpacity>
                  </View>
               </View>
               <View style={addStyles.layoutInput}>
                  <BSelect
                     width="100%"
                     placeholder="Type"
                     backgroud={'white'}
                     color="dark.50"
                     variantSelect="filter"
                     value={categoryId}
                     change={setCategoryId}>
                     {category?.listCategory.map(item => {
                        return (
                           <Select.Item label={item.name} value={item.id} />
                        );
                     })}
                  </BSelect>
               </View>
               <View style={addStyles.layoutInput}>
                  <ListMenuFilter
                     title="No Prepayment"
                     button={
                        <Switch
                           size="lg"
                           value={noPrepayment}
                           onValueChange={() => toggleSwitch('Prepayment')}
                        />
                     }
                  />
               </View>
               {/* <View style={addStyles.layoutInput}>
                  <ListMenuFilter
                     title="Deals"
                     button={
                        <Switch
                           size="lg"
                           value={prepayment}
                           onValueChange={setPrepayment}
                        />
                     }
                  />
               </View> */}
               <View>
                  <ListMenuFilter
                     title="Only show available"
                     button={
                        <Switch
                           size="lg"
                           value={isAvailable}
                           onValueChange={() => toggleSwitch('Available')}
                        />
                     }
                  />
               </View>
               <View style={addStyles.layoutButton}>
                  <TouchableOpacity onPress={filterHandle}>
                     <CButton
                        classButton={styles.buttonPayment}
                        textButton={styles.fontButtonPayment}>
                        Apply
                     </CButton>
                  </TouchableOpacity>
               </View>
            </ScrollView>
         </Container>
      </View>
   );
};

const addStyles = StyleSheet.create({
   layoutFilter: {
      marginTop: 10,
   },
   layoutInput: {
      marginTop: 10,
   },
   layoutButton: {
      marginTop: 50,
      marginBottom: 20,
   },
   picker: {
      width: '100%',
      backgroundColor: 'blue',
      color: 'white',
      fontWeight: '700',
   },
   inputDate: {
      backgroundColor: 'white',
      // opacity: 0.1,
      borderWidth: 0,
      minWidth: '100%',
      height: 50,
      paddingLeft: 20,
      marginRight: 10,
      fontSize: 18,
      fontWeight: '600',
   },
   iconDate: {
      color: stylePrimary.mainColor,
      fontSize: 22,
      position: 'absolute',
      bottom: 15,
      right: 20,
   },
});

export {addStyles};

export default FilterMenu;
