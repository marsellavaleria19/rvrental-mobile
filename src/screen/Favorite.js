import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import IconChevron from 'react-native-vector-icons/FontAwesome';
import stylePrimary from '../assets/styles/stylePrimary';
import ListFavorite from '../components/ListHistoryFavorite';
import image from '../assets/images/background-reservation.png';
import {ScrollView} from 'native-base';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getListFavorite} from '../redux/actions/favorite';
import {FlatList} from 'native-base';
import ListDetail from '../components/ListDetail';

const Favorite = ({navigation}) => {
   const {favorite, auth} = useSelector(state => state);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getListFavorite());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <View style={styles.background}>
         <Container>
            <ScrollView>
               <View style={addStyles.layoutFavorite}>
                  {favorite.listFavorite.length > 0 ? (
                     <FlatList
                        data={favorite.listFavorite}
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
                                       : 'Not Available'
                                 }
                                 price={item.price}
                                 rate={item.rate}
                                 navigate={() =>
                                    navigation.navigate(
                                       `${auth.user !== null && 'Reservation'}`,
                                       {
                                          vehicleId: item.id,
                                       },
                                    )
                                 }
                              />
                           );
                        }}
                     />
                  ) : (
                     <Text>Data not found</Text>
                  )}
               </View>
            </ScrollView>
         </Container>
      </View>
   );
};

const addStyles = StyleSheet.create({
   layoutToday: {
      marginTop: 30,
   },
   flexRow: {
      flexDirection: 'row',
   },
   listToday: {
      height: 50,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: '#DADADA',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   fontTitle: {
      fontSize: 14,
      color: '#C4C4C4',
      fontWeight: '600',
      marginBottom: 13,
   },
   iconChevron: {
      fontSize: 14,
      color: '#999999',
   },
   layoutFavorite: {
      marginTop: 30,
      marginBottom: 18,
   },
});

export {addStyles};

export default Favorite;
