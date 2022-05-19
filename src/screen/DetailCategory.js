import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Container from '../components/Container';
import {input} from '../assets/styles/styleComponent';
import ListDetail from '../components/ListDetail';
import {getListVehicleByCategory} from '../redux/actions/vehicle';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {FlatList} from 'native-base';
import image from '../assets/images/image-item.png';
import {styles} from '../assets/styles/styles';
import NBModal from '../components/NBModal';
import NotFound from '../components/NotFound';
import NBModalLoading from '../components/NBModalLoading';
import {saveDetailVehicle, getNextListVehicle} from '../redux/actions/vehicle';
import {LIMIT_VEHICLE} from '@env';

const DetailCategory = ({route, navigation}) => {
   const {categoryId} = route.params;
   const {vehicle, auth} = useSelector(state => state);
   const dispatch = useDispatch();
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   useEffect(() => {
      dispatch(getListVehicleByCategory(categoryId, LIMIT_VEHICLE, 'category'));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [categoryId]);

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
      // auth.user?.isVerified == true
      // ? () =>
      //      navigation.navigate(
      //         `${
      //            auth.user !== null &&
      //            auth.user.role == 'admin'
      //               ? 'EditItem'
      //               : 'Reservation'
      //         }`,
      //         {
      //            vehicleId: item.id,
      //         },
      //      )
      // : handleShow
   };

   const nextPageHandle = page => {
      if (page.next !== null) {
         dispatch(getNextListVehicle(page.next));
      }
   };

   return (
      <View style={styles.background}>
         <Container>
            {!vehicle.isLoading ? (
               vehicle.listVehicle.length > 0 ? (
                  <FlatList
                     data={vehicle.listVehicle}
                     renderItem={({item}) => {
                        return (
                           <ListDetail
                              path={{
                                 uri: `${
                                    item.photo !== null ? item.photo : image
                                 }`,
                              }}
                              title={item.name}
                              description={
                                 item.description !== null
                                    ? item.description
                                    : '-'
                              }
                              detail="2.1 km for your location"
                              status={
                                 item.isAvailable == 1
                                    ? 'Available'
                                    : 'Full Booked'
                              }
                              price={item.price}
                              rate={item.rate}
                              navigate={() => detailVehicleHandle(item)}
                           />
                        );
                     }}
                     onEndReached={() => nextPageHandle(vehicle.pageInfo)}
                     onEndReachedThreshold={0.5}
                  />
               ) : (
                  <NotFound />
               )
            ) : (
               <NBModalLoading />
            )}
            <NBModal
               title="Verifiy Email"
               show={show}
               functionClose={handleClose}
               functionHandle={verifyHandle}
               isButtonCancel={false}
               button="Go to verifiy email">
               <Text>
                  Sorry, your account is not verfied. Please verified your
                  account for enjoy our product..
               </Text>
            </NBModal>
            {/* <NBModal
               title="Verified User"
               show={show}
               functionShow={handleShow}
               functionClose={handleClose}
               functionHandle={verifyHandle}
               button={'Verified'}>
               <Text>
                  Sorry, your account is not verfied. Please verified your
                  account for enjoy our product..
               </Text>
            </NBModal> */}
            {/* <ListDetail
            path={require('../assets/images/list-car1.png')}
            title="Vespa Matic"
            description="Max for 2 person"
            detail="2.1 km for your location"
            status="Avaliable"
            price="Rp. 140.000"
            rate="4.5"
         />
            {/* <FlatList
               data={vehicle.listVehicle}
               renderItem={({item}) => {
                  return (
                     <ListDetail
                        path={{
                           uri: `${item.photo !== null ? item.photo : image}`,
                        }}
                        title={item.name}
                        description={
                           item.description !== null ? item.description : '-'
                        }
                        detail="2.1 km for your location"
                        status={
                           item.isAvailable == 1 ? 'Available' : 'Not Available'
                        }
                        price={item.price}
                        rate={item.rate}
                        navigate={
                           auth.user?.isVerified == true
                              ? () =>
                                   navigation.navigate(
                                      `${
                                         auth.user !== null &&
                                         auth.user.role == 'admin'
                                            ? 'EditItem'
                                            : 'Reservation'
                                      }`,
                                      {
                                         vehicleId: item.id,
                                      },
                                   )
                              : handleShow
                        }
                     />
                  );
               }}
            />
            <NBModal
               title="Verified User"
               show={show}
               functionShow={handleShow}
               functionClose={handleClose}
               functionHandle={verifyHandle}
               isButton={true}
               buttonTitile="Verified">
               <Text>
                  Sorry, your account is not verfied. Please verified your
                  account for enjoy our product..
               </Text>
            </NBModal> */}
            {/* <ListDetail
            path={require('../assets/images/list-car1.png')}
            title="Vespa Matic"
            description="Max for 2 person"
            detail="2.1 km for your location"
            status="Avaliable"
            price="Rp. 140.000"
            rate="4.5"
         />
         <ListDetail
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
   layoutNotFound: {
      justifyContent: 'center',
      alignItems: 'center',
   },
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
      position: 'absolute',
      color: 'white',
      fontWeight: '700',
      fontSize: 20,
      right: 20,
      marginTop: 20,
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
});

export {addStyles};

export default DetailCategory;
