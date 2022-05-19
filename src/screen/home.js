import * as React from 'react';
import {
   View,
   StyleSheet,
   ImageBackground,
   Image,
   TouchableOpacity,
   Text,
} from 'react-native';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import Input from '../components/Input';
import CButton from '../components/Button';
import stylePrimary from '../assets/styles/stylePrimary';
import {input} from '../assets/styles/styleComponent';
import IconSearch from 'react-native-vector-icons/FontAwesome';
import ListBar from '../components/ListBar';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {FlatList, Skeleton, VStack} from 'native-base';
import filter from '../helpers/FilterSearch';
import photoItem from '../assets/images/image-item.png';
import NBModalLoading from '../components/NBModalLoading';
import {
   getListVehicleByCategory,
   saveDetailVehicle,
} from '../redux/actions/vehicle';
import {LIMIT_CATEGORY} from '@env';
import NBModal from '../components/NBModal';
// import {image} from '../assets/images/backgroud-image.png'

const image = {uri: 'https://reactjs.org/logo-og.png'};

const Home = ({navigation}) => {
   const {category, vehicle, auth} = useSelector(state => state);
   const dispatch = useDispatch();
   const [listVehicle, setLisstVehicle] = useState([]);
   const [search, setSearch] = useState('');
   const [showModalLoading, setShowModalLoading] = useState(false);
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   useEffect(() => {
      dispatch({
         type: 'CLEAR_VEHICLE',
      });
      category.listCategory.length > 0 &&
         category.listCategory.forEach(itemCategory => {
            dispatch(
               getListVehicleByCategory(
                  itemCategory.id,
                  LIMIT_CATEGORY,
                  'home',
               ),
            );
         });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch]);

   useEffect(() => {
      setShowModalLoading(vehicle.isLoading);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [vehicle.isLoading]);

   const searchHandle = () => {
      filter.name = search;
      navigation.navigate('Filter');
   };

   const itemPerCategory = category => {
      var listVehicle = vehicle.listAllVehicle.filter(
         item => item.category_id === category.id,
      );
      if (listVehicle.length > 0) {
         listVehicle = [...new Set(listVehicle)];
      }

      return listVehicle;
   };

   const showButtonItem = () => {
      return (
         <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
            <CButton
               classButton={addStyles.buttonNewItem}
               textButton={addStyles.fontButtonNewItem}>
               Add new item
            </CButton>
         </TouchableOpacity>
      );
   };

   const navigateToDetailCategory = item => {
      navigation.navigate('DetailCategory', {
         categoryId: item.id,
      });
   };

   const verifyHandle = () => {
      navigation.navigate('VerifyUserEmail');
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

   return (
      <View style={styles.background}>
         <NBModalLoading show={showModalLoading} />
         <NBModal
            title="Verifiy Email"
            show={show}
            functionClose={handleClose}
            functionHandle={verifyHandle}
            isButtonCancel={false}
            button="Go to verifiy email">
            <Text>
               Sorry, your account is not verfied. Please verified your account
               for enjoy our product..
            </Text>
         </NBModal>
         <FlatList
            ListHeaderComponent={
               <View>
                  <ImageBackground
                     source={require('../assets/images/background-search.png')}
                     resizeMode="cover"
                     style={addStyles.imageBackgroundSearch}>
                     <Container>
                        <View style={addStyles.layoutSearch}>
                           <Input
                              classInput={addStyles.input}
                              placeholder="Search vehicle"
                              value={search}
                              placeholderTextColor="white"
                              change={setSearch}
                           />
                           <TouchableOpacity onPress={searchHandle}>
                              <IconSearch
                                 name="search"
                                 style={addStyles.icon}
                              />
                           </TouchableOpacity>
                        </View>
                        {auth.user?.role == 'admin' && showButtonItem()}
                     </Container>
                  </ImageBackground>
               </View>
            }
            data={category.listCategory}
            renderItem={({item}) => {
               return (
                  <View style={addStyles.layoutCategory}>
                     {itemPerCategory(item).length > 0 && (
                        <ListBar
                           title={item.name}
                           navigate={() => navigateToDetailCategory(item)}>
                           <FlatList
                              horizontal={true}
                              data={itemPerCategory(item)}
                              renderItem={({item}) => {
                                 return (
                                    <TouchableOpacity
                                       onPress={() =>
                                          detailVehicleHandle(item)
                                       }>
                                       {item.photo !== null ? (
                                          <Image
                                             key={item.id}
                                             source={{
                                                uri: `${item.photo}`,
                                             }}
                                             style={addStyles.imageList}
                                          />
                                       ) : (
                                          <Image
                                             key={item.id}
                                             source={photoItem}
                                             style={addStyles.imageList}
                                          />
                                       )}
                                    </TouchableOpacity>
                                 );
                              }}
                           />
                        </ListBar>
                     )}
                  </View>
               );
            }}
         />
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
      height: 250,
   },
   icon: {
      position: 'absolute',
      color: 'white',
      fontWeight: '700',
      fontSize: 20,
      right: 20,
   },
   layoutSearch: {
      position: 'relative',
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center',
   },

   imageList: {
      marginHorizontal: 10,
      height: 168,
      width: 265,
      borderRadius: 10,
   },
   buttonNewItem: {
      backgroundColor: stylePrimary.secondaryColor,
      marginTop: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 66,
      borderRadius: 10,
   },
   fontButtonNewItem: {
      fontSize: 24,
      color: stylePrimary.mainColor,
      fontWeight: '700',
   },
   layoutCategory: {
      marginBottom: 10,
   },
});

export {addStyles};

export default Home;
