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
import NotFound from '../../components/NotFound';
import {saveDetailVehicle} from '../../redux/actions/vehicle';
import NBModal from '../../components/NBModal';

const Filter = ({navigation}) => {
   const {search, auth} = useSelector(state => state);
   const dispatch = useDispatch();
   const [page, setPage] = useState({});
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

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

   const detailVehicleHandle = item => {
      dispatch(saveDetailVehicle(item));
      if (auth.user !== null) {
         if (auth.user.isVerified == true) {
            if (auth.user.role == 'admin') {
               navigation.navigate('EditItem');
            } else {
               navigation.navigate('Reservation');
            }
         } else {
            handleShow();
         }
      }
   };

   const verifyHandle = () => {
      navigation.navigate('VerifyUserEmail');
   };

   const FilterSearchHandle = () => {
      let result = filter.name;
      Object.keys(filter).forEach(key => {
         if (key !== 'name' && filter[key] !== '') {
            if (result == '') {
               result += filter[key];
            } else {
               result += '-' + filter[key];
            }
         }
      });
      return <Text style={addStyles.textFilterName}>{result}</Text>;
   };

   return (
      <View style={styles.background}>
         <View style={addStyles.layoutFilterName}>
            <FilterSearchHandle />
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
         </Container>
         <View>
            {search.listSearch.length > 0 ? (
               <FlatList
                  data={search.listSearch}
                  renderItem={({item}) => {
                     return (
                        <Container>
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
                              navigate={() => detailVehicleHandle(item)}
                           />
                        </Container>
                     );
                  }}
                  onEndReached={() => nextPageHandle(search.pageInfo)}
                  onEndReachedThreshold={0.5}
               />
            ) : (
               <NotFound />
            )}
            <NBModal
               title="Verifiy Email"
               show={show}
               functionClose={handleClose}
               functionHandle={verifyHandle}
               isButtonCancel={true}
               button="Go to verifiy email">
               <Text>
                  Sorry, your account is not verfied. Please verified your
                  account for enjoy our product..
               </Text>
            </NBModal>
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
      color: stylePrimary.background,
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
