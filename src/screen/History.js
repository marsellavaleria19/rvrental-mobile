import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import IconChevron from 'react-native-vector-icons/FontAwesome';
import stylePrimary from '../assets/styles/stylePrimary';
import ListHistory from '../components/ListHistoryFavorite';
import image from '../assets/images/background-reservation.png';
import {FlatList, ScrollView} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getListHistory} from '../redux/actions/history';
import {useEffect} from 'react';

const History = ({navigation, route}) => {
   const {history, auth} = useSelector(state => state);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getListHistory(auth.token));

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const listHistoryByIdUser = () => {
      return history.listHistory.filter(item => item.user_id == auth.user.id);
   };

   return (
      <View style={styles.background}>
         <Container>
            <ScrollView>
               <View style={addStyles.layoutToday}>
                  <Text style={addStyles.fontTitle}>Today</Text>
                  <View style={addStyles.listToday}>
                     <Text style={addStyles.textToday}>
                        Please finish your payment for vespa for Vespa Rental
                        Jogja
                     </Text>
                     <IconChevron
                        name="chevron-right"
                        style={addStyles.iconChevron}
                     />
                  </View>
                  <View style={addStyles.listToday}>
                     <Text style={addStyles.textToday}>
                        Your payment for a vintage bike at Jogja just confirmed!
                     </Text>
                  </View>
               </View>
               <View style={addStyles.layoutWeek}>
                  <Text style={addStyles.title}>A Week Ago</Text>
               </View>
               <FlatList
                  data={listHistoryByIdUser}
                  renderItem={({item}) => {
                     return (
                        <ListHistory
                           path={
                              item.photo !== null
                                 ? {uri: `${item.photo}`}
                                 : image
                           }
                           title={item.brand}
                           reservationDate={`${item.rentStartDate} to ${item.rentEndDate}`}
                           payment={item.prepayment}
                           status={item.status}
                           isHistory={true}
                        />
                     );
                  }}
               />
               {/* <ListHistory
                  path={image}
                  title="Vespa Matic"
                  reservationDate="Jan 18 to 21 2021"
                  payment={245000}
                  status="Has been returned"
                  isHistory={true}
               />
               <ListHistory
                  path={image}
                  title="Vespa Matic"
                  reservationDate="Jan 18 to 21 2021"
                  payment={245000}
                  status="Has been returned"
                  isHistory={true}
               />
               <ListHistory
                  path={image}
                  title="Vespa Matic"
                  reservationDate="Jan 18 to 21 2021"
                  payment={245000}
                  status="Has been returned"
                  isHistory={true}
               />
               <ListHistory
                  path={image}
                  title="Vespa Matic"
                  reservationDate="Jan 18 to 21 2021"
                  payment={245000}
                  status="Has been returned"
                  isHistory={true}
               />
               <ListHistory
                  path={image}
                  title="Vespa Matic"
                  reservationDate="Jan 18 to 21 2021"
                  payment={245000}
                  status="Has been returned"
                  isHistory={true}
               />
               <ListHistory
                  path={image}
                  title="Vespa Matic"
                  reservationDate="Jan 18 to 21 2021"
                  payment={245000}
                  status="Has been returned"
                  isHistory={true}
               /> */}
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
   textToday: {
      fontSize: 14,
      color: stylePrimary.mainColor,
      fontWeight: '400',
   },
   layoutWeek: {
      marginTop: 30,
      marginBottom: 18,
   },
});

export {addStyles};

export default History;
