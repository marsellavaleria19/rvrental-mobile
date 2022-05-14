import * as React from 'react';
import {
   Text,
   View,
   StyleSheet,
   ImageBackground,
   Image,
   TouchableOpacity,
} from 'react-native';
import Container from '../../components/Container';
import {input, button} from '../../assets/styles/styleComponent';
import ListFilter from '../../components/ListDetail';
import IconFilter from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import filter from '../../helpers/FilterSearch';
import {getListSearchFilter} from '../../redux/actions/search';
import image from '../..//assets/images/image-photo.png';
import {FlatList} from 'native-base';
import {getNextListSearchFilter} from '../../redux/actions/search';
import {styles} from '../../assets/styles/styles';
import stylePrimary from '../../assets/styles/stylePrimary';

const Filter = ({navigation}) => {
   const {search} = useSelector(state => state);
   const dispatch = useDispatch();
   const [page, setPage] = useState({});

   useEffect(() => {
      console.log(filter);
      dispatch(getListSearchFilter(filter));
      setPage(search.pageInfo);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const nextPageHandle = page => {
      if (page.next !== null) {
         dispatch(getNextListSearchFilter(page.next));
      }
   };

   // const filterSearchHandle = () => {
   //    let result = '';
   //    Object.keys(filter).forEach(key => {
   //       if (key !== 'name' && filter[key] !== '') {
   //          if (result == '') {
   //             result += filter[key];
   //          } else {
   //             result += filter[key] + ',';
   //          }
   //       }
   //    });
   //    return result;
   // };

   return (
      <View style={styles.background}>
         <View style={addStyles.layoutFilterName}>
            <Text style={addStyles.textFilterName}>{filter.name}</Text>
         </View>
         <Container>
            <View>
               <TouchableOpacity
                  style={addStyles.layoutFilter}
                  onPress={() => navigation.navigate('FilterMenu')}>
                  <IconFilter name="filter" style={addStyles.icon} />
                  <Text>Filter Search</Text>
               </TouchableOpacity>
            </View>
            <View>
               {search.listSearch.length > 0 ? (
                  <FlatList
                     data={search.listSearch}
                     h={'90%'}
                     renderItem={({item}) => {
                        return (
                           <ListFilter
                              path={
                                 item.photo !== null
                                    ? {uri: `${item.photo}`}
                                    : image
                              }
                              title={item.brand}
                              description="Max for 2 person"
                              detail="2.1 km for your location"
                              status={
                                 item.isAvailable == 1
                                    ? 'Available'
                                    : 'Full Booked'
                              }
                              price={`Rp. ${parseFloat(
                                 item.price,
                              ).toLocaleString('id-ID')}`}
                              rate={item.rate}
                           />
                        );
                     }}
                     onEndReached={() => nextPageHandle(search.pageInfo)}
                     onEndReachedThreshold={0.5}
                  />
               ) : (
                  <Text>Data not found</Text>
               )}
            </View>

            {/* <ListFilter
               path={require('../assets/images/list-car1.png')}
               title="Vespa Matic"
               description="Max for 2 person"
               detail="2.1 km for your location"
               status="Avaliable"
               price="Rp. 140.000"
               rate="4.5"
            />
            <ListFilter
               path={require('../assets/images/list-car1.png')}
               title="Vespa Matic"
               description="Max for 2 person"
               detail="2.1 km for your location"
               status="Avaliable"
               price="Rp. 140.000"
               rate="4.5"
            /> */}
         </Container>
      </View>
   );
};

const addStyles = StyleSheet.create({
   input: {
      marginTop: 18,
      fontSize: 14,
      fontWeight: '700',
      backgroundColor: 'rgba(60,60,60, 0.5)',
      ...input,
   },
   imageBackgroundSearch: {
      height: 280,
   },
   icon: {
      color: stylePrimary.mainColor,
      fontWeight: '700',
      fontSize: 20,
      marginRight: 4,
   },
   layoutFilterName: {
      height: 55,
      backgroundColor: stylePrimary.mainColor,
   },
   textFilterName: {
      marginTop: 15,
      marginLeft: 30,
      color: stylePrimary.backgrorund,
      fontSize: 16,
   },
   layoutFilter: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
   },
   imageList: {
      marginHorizontal: 10,
      height: 168,
      width: 265,
      borderRadius: 10,
   },
});

export {addStyles};

export default Filter;
