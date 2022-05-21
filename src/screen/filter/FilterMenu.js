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
import NBInput from '../../components/NBInput';
import {validation} from '../../helpers/validation';

const FilterMenu = ({navigation}) => {
   const {search, category, location} = useSelector(state => state);
   const dispatch = useDispatch();
   var [inputFilter, setInputFilter] = useState({
      name: '',
      price_start: '0',
      price_end: '0',
      rate_start: '0',
      rate_end: '0',
      location_id: '',
      category_id: '',
      status_id: '',
      isAvailable: '',
   });
   const [listSort, setListSort] = useState([
      {
         id: 1,
         name: 'Sort by low price',
         sort: 'price',
         order: 'asc',
      },
      {id: 2, name: 'Sort by high price', sort: 'price', order: 'desc'},
   ]);
   const [sortOrder, setSortOrder] = useState(null);
   // const [rate, setRate] = useState('');
   // const [locationId, setLocationId] = useState('');
   // const [priceStart, setPriceStart] = useState('');
   // const [priceEnd, setPriceEnd] = useState('');
   // const [rateStart, setRateStart] = useState('');
   // const [rateEnd, setRateEnd] = useState('');
   // const [categoryId, setCategoryId] = useState('');
   const [noPrepayment, setNoPrepayment] = useState('');
   const [isAvailable, setIsAvailable] = useState('');
   const [dateFilter, setDateFilter] = useState(new Date());
   const [isDateChange, setIsDateChange] = useState(false);
   const [availableChange, setAvaliableChange] = useState(false);
   const [prepaymentChange, setPrepaymentChange] = useState(false);
   const [errorValidate, setErrorValidate] = useState({});

   useEffect(() => {
      setInputFilter({
         name: filter.name,
         location_id: '',
         price_start: '',
         price_end: '',
         rate_start: '',
         rate_end: '',
         category_id: '',
         status_id: '',
         isAvailable: '',
      });
      setIsDateChange(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const onChange = (event, selectedDate) => {
      setIsDateChange(true);
      setDateFilter(selectedDate);
   };

   const showDatePicker = () => {
      DateTimePickerAndroid.open({
         value: dateFilter,
         onChange,
         mode: 'date',
         is24Hour: true,
      });
   };

   const filterHandle = () => {
      filter.location = '';
      filter.price_start = '';
      filter.price_end = '';
      filter.rate_start = '';
      filter.rate_end = '';
      filter.date = '';
      filter.category = '';
      filter.status = '';
      filter.isAvailable = '';
      filter.sort = '';
      filter.order = '';
      const dataFilter = {
         name: filter.name,
         location_id: '',
         price_start: '',
         price_end: '',
         rate_start: '',
         rate_end: '',
         date: '',
         category_id: '',
         status_id: '',
         isAvailable: '',
         sort: '',
         order: '',
      };

      if (isDateChange == true) {
         dataFilter.date = moment(dateFilter.toISOString()).format(
            'YYYY-MM-DD',
         );
         filter.date = dataFilter.date;
      } else {
         dataFilter.date = '';
      }

      const data = {
         'rate start': inputFilter.rate_start,
         'rate end': inputFilter.rate_end,
         'price start': inputFilter.price_start,
         'price end': inputFilter.price_end,
      };

      const requirement = {
         'rate start': 'number',
         'rate end': 'number',
         'price start': 'number',
         'price end': 'number',
      };

      const validate = validation(data, requirement);

      if (Object.keys(validate).length == 0) {
         Object.keys(dataFilter).forEach(item => {
            if (
               item !== 'date' &&
               item !== 'status_id' &&
               item !== ['isAvailable'] &&
               item !== 'sort' &&
               item !== 'order'
            ) {
               dataFilter[item] = inputFilter[item];
               if (inputFilter.location_id !== '') {
                  if (item == 'location_id') {
                     filter.location = location.listLocation.filter(
                        value => value.id == inputFilter.location_id,
                     )[0].location;
                  }
               }
               if (inputFilter.category_id !== '') {
                  if (item == 'category_id') {
                     filter.category = category.listCategory.filter(
                        value => value.id == inputFilter.category_id,
                     )[0].name;
                  }
               }
            }
         });

         if (prepaymentChange == true) {
            if (noPrepayment == true) {
               dataFilter.status_id = '6';
               filter.status = 'No Prepayment';
            } else {
               dataFilter.status_id = '';
            }
         } else {
            dataFilter.status_id = '';
         }

         if (availableChange == true) {
            if (isAvailable == true) {
               dataFilter.isAvailable = '1';
               filter.isAvailable = 'Available';
            } else {
               dataFilter.isAvailable = '0';
            }
         } else {
            dataFilter.isAvailable = '';
         }

         if (sortOrder !== null) {
            console.log(sortOrder);
            const resultSortOrder = listSort.filter(
               item => item.id == sortOrder,
            )[0];
            dataFilter.sort = resultSortOrder.sort;
            filter.sort = resultSortOrder.sort;
            dataFilter.order = resultSortOrder.order;
            filter.order = resultSortOrder.order;
         }
         console.log(dataFilter);
         dispatch(getListSearchFilter(dataFilter));
         navigation.navigate('Filter');
         setPrepaymentChange(false);
         setAvaliableChange(false);
      } else {
         setErrorValidate(validate);
      }
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
                     color="dark.50"
                     variantSelect="filter"
                     value={inputFilter.location_id}
                     change={newLocation =>
                        setInputFilter({
                           ...inputFilter,
                           location_id: newLocation,
                        })
                     }>
                     {location.listLocation.map(item => {
                        return (
                           <Select.Item label={item.location} value={item.id} />
                        );
                     })}
                  </BSelect>
               </View>
               <View style={addStyles.layoutInput}>
                  {/* <BSelect
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
                  </BSelect> */}
                  <Text style={addStyles.filter}>Range Rate</Text>
                  <NBInput
                     placeholder={'Range rate start at'}
                     classVariant="item"
                     value={inputFilter.rate_start}
                     change={newRate =>
                        setInputFilter({...inputFilter, rate_start: newRate})
                     }
                     isValidate={Object.keys(errorValidate).length > 0 && true}
                     errorMessage={
                        Object.keys(errorValidate).length > 0 &&
                        errorValidate['rate start']
                     }
                  />
                  <NBInput
                     placeholder={'Range rate end at'}
                     classVariant="item"
                     value={inputFilter.rate_end}
                     change={newRate =>
                        setInputFilter({...inputFilter, rate_end: newRate})
                     }
                     isValidate={Object.keys(errorValidate).length > 0 && true}
                     errorMessage={
                        Object.keys(errorValidate).length > 0 &&
                        errorValidate['rate end']
                     }
                  />
               </View>
               <View style={addStyles.layoutInput}>
                  {/* <BSelect
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
                  </BSelect> */}
                  <Text style={addStyles.filter}>Range Price</Text>
                  <NBInput
                     placeholder={'Range Price start at'}
                     classVariant="item"
                     value={inputFilter.price_start}
                     change={newPrice =>
                        setInputFilter({...inputFilter, price_start: newPrice})
                     }
                     isValidate={Object.keys(errorValidate).length > 0 && true}
                     errorMessage={
                        Object.keys(errorValidate).length > 0 &&
                        errorValidate['price start']
                     }
                  />
                  <NBInput
                     placeholder={'Range Price end at'}
                     classVariant="item"
                     value={inputFilter.price_end}
                     change={newPrice =>
                        setInputFilter({...inputFilter, price_end: newPrice})
                     }
                     isValidate={Object.keys(errorValidate).length > 0 && true}
                     errorMessage={
                        Object.keys(errorValidate).length > 0 &&
                        errorValidate['price start']
                     }
                  />
               </View>
               <View style={addStyles.layoutInput}>
                  <BSelect
                     width="100%"
                     placeholder="Sort"
                     color={stylePrimary.mainColor}
                     variantSelect="filter"
                     value={sortOrder}
                     change={setSortOrder}>
                     {listSort.map(item => {
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
                        value={moment(dateFilter.toISOString()).format(
                           'YYYY-MM-DD',
                        )}
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
                     color={stylePrimary.mainColor}
                     variantSelect="filter"
                     value={inputFilter.category_id}
                     change={newCategory =>
                        setInputFilter({
                           ...inputFilter,
                           category_id: newCategory,
                        })
                     }>
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
                           onValueChange={() => toggleSwitch('Prepayment')}
                        />
                     }
                  />
               </View>
               <View>
                  <ListMenuFilter
                     title="Only show available"
                     button={
                        <Switch
                           size="lg"
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
   filter: {
      fontSize: 18,
      fontWeight: '600',
      paddingLeft: 5,
      marginTop: 10,
      color: stylePrimary.mainColor,
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
      backgroundColor: stylePrimary.background,
      // opacity: 0.1,
      borderWidth: 0,
      minWidth: '100%',
      height: 50,
      paddingLeft: 5,
      marginRight: 10,
      fontSize: 18,
      fontWeight: '600',
      color: stylePrimary.mainColor,
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
